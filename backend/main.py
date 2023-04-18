import ffmpeg


def main():
    width = 640
    height = 480
    framerate = 30
    bitrate = '1M'

    stream_url = 'rtmp://<server-address>/<stream-name>'

    input_params = {
        'video_size': f'{width}x{height}',
        'framerate': str(framerate),
        'pixel_format': 'yuyv422',
        'input_format': 'rawvideo'
    }

    output_params = {
        'pix_fmt': 'yuv420p',
        'preset': 'veryfast',
        'b:v': bitrate,
        'f': 'flv'
    }

    stream = ffmpeg.input('video0', format='v4l2', **input_params)
    stream = ffmpeg.output(stream, stream_url, **output_params)

    ffmpeg.run(stream)


if "__main__" == __name__:
    main()
