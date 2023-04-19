import cv2
import os
import face_recognition
import threading


class FacialRecognitionThread(threading.Thread):
    def __init__(self, frame):
        threading.Thread.__init__(self)
        self.frame = frame
        self.face_locations = []
        self.face_encodings = []

    def run(self):
        self.face_locations = face_recognition.face_locations(
            self.frame, number_of_times_to_upsample=1)
        self.face_encodings = face_recognition.face_encodings(
            self.frame, self.face_locations)


def facial_recognition_handler():
    # Capture webcam feed and detect faces
    video_capture = cv2.VideoCapture(0)

    while True:
        ret, frame = video_capture.read()

        # Spawn a new thread for facial recognition
        thread = FacialRecognitionThread(frame)
        thread.start()
        thread.join()

        # Draw boxes around the faces
        for top, right, bottom, left in thread.face_locations:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

        # Display the resulting image
        cv2.imshow('Video', frame)

        # Exit loop on key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release webcam and close all windows
    video_capture.release()
    cv2.destroyAllWindows()


facial_recognition_handler()
