import ffmpeg
import cv2


def main():

    # width = 640
    # height = 480
    # framerate = 30

    # Set up video capture
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    framerate = int(cap.get(cv2.CAP_PROP_FPS))

    # Set up ffmpeg input and output parameters
    input_params = {
        'video_size': f'{width}x{height}',
        'framerate': str(framerate),
        'pixel_format': 'bgr24',
        'input_format': 'rawvideo'
    }

    stream_url = 'rtmp://<server-address>/<stream-name>'

    output_params = {
        'pix_fmt': 'yuv420p',
        'preset': 'veryfast',
        'b:v': '1M',
        'f': 'flv'
    }

    # Set up ffmpeg input and output streams
    # stream = ffmpeg.input('video0', format='v4l2', **input_params) # raspberry pi

    stream = ffmpeg.input('video=Camera 0', format='v4l2',
                          **input_params)  # windows
    stream = ffmpeg.output(stream, stream_url, **output_params)

    # Start streaming video frames to AWS server
    ffmpeg.run(stream)


if __name__ == "__main__":
    main()
