# Configure the AWS provider
provider "aws" {
  region = "us-east-1"
}

# Create an EC2 instance to receive the video feed
resource "aws_instance" "video_feed_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2
  instance_type = "t2.micro"
  key_name      = "my-key-pair"
  vpc_security_group_ids = [
    aws_security_group.video_feed.id
  ]

  user_data = <<-EOF
    #!/bin/bash
    sudo yum -y update
    sudo amazon-linux-extras install nginx1.12
    sudo systemctl start nginx
    sudo systemctl enable nginx
  EOF
}

# Create a security group for the video feed server
resource "aws_security_group" "video_feed" {
  name_prefix = "video-feed"
}

# Allow incoming traffic on port 80 for the video feed server
resource "aws_security_group_rule" "video_feed_http_ingress" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.video_feed.id
}

# Create an S3 bucket to store the video files
resource "aws_s3_bucket" "video_files" {
  bucket = "my-video-files"
}

# Configure the CloudFront distribution to deliver the video stream
resource "aws_cloudfront_distribution" "video_stream" {
  origin {
    domain_name = aws_instance.video_feed_server.public_ip
    origin_id   = "video-feed-server"
  }

  enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "video-feed-server"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_All"

  # Use ACM to generate an SSL certificate
  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/abcdefgh-1234-5678-abcd-efghijklmnop"
    ssl_support_method  = "sni-only"
  }
}

# Create an API Gateway to send the video stream to the React Native app
resource "aws_api_gateway_rest_api" "video_api" {
  name        = "video-api"
  description = "API for delivering video streams"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Create a Lambda function to handle API requests
resource "aws_lambda_function" "video_handler" {
  filename      = "video_handler.zip"
  function_name = "video-handler"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "video_handler.lambda_handler"
  runtime       = "python3.9"
}

# Create an IAM role for the Lambda function
resource "aws_iam_role" "lambda_exec" {
  name = "lambda-exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach policies to the IAM role
resource "aws_iam_policy_attachment" "lambda_exec_policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_exec.name
}

# Create an API Gateway method to invoke the Lambda function
resource "aws_api_gateway_method" "video_method" {
  rest_api_id   = aws_api_gateway_rest_api.video_api.id
  resource_id   = aws_api_gateway_rest_api.video_api.root_resource_id
  http_method   = "GET"
  authorization = "NONE"
}

# Create an API Gateway integration to connect the method to the Lambda function
resource "aws_api_gateway_integration" "video_integration" {
  rest_api_id             = aws_api_gateway_rest_api.video_api.id
  resource_id             = aws_api_gateway_rest_api.video_api.root_resource_id
  http_method             = aws_api_gateway_method.video_method.http_method
  integration_http_method = "GET"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.video_handler.invoke_arn
}

# Create an API Gateway deployment to make the API available
resource "aws_api_gateway_deployment" "video_deployment" {
  rest_api_id = aws_api_gateway_rest_api.video_api.id
  stage_name  = "prod"
}

# Output the API Gateway URL for the React Native app to use
output "api_gateway_url" {
  value = aws_api_gateway_deployment.video_deployment.invoke_url
}
