import boto3


def video_handler(event, context):

    try:
        s3 = boto3.client('s3')

        # Get the requested video file name from the query parameters
        file_name = event['queryStringParameters']['file_name']

        # Retrieve the video file from S3
        video = s3.get_object(Bucket='video_files', Key=file_name)

        # Get the video file data and set the content type
        video_data = video['Body'].read()
        content_type = video['ContentType']

        # Return the video file as the response
        return {
            'statusCode': 200,
            'body': video_data,
            'headers': {
                'Content-Type': content_type,
                'Access-Control-Allow-Origin': '*'
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'error': str(e),
        }
