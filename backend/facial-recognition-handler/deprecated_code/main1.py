import cv2
import os
import face_recognition
import threading


def facial_recognition_handler():
    # Create directory for storing face images
    if not os.path.exists('faces'):
        os.mkdir('faces')

    # Load known faces and their encodings
    known_faces = []
    known_names = []

    for filename in os.listdir('faces'):
        image = face_recognition.load_image_file(f'faces/{filename}')
        encoding = face_recognition.face_encodings(image)[0]
        known_faces.append(encoding)
        known_names.append(os.path.splitext(filename)[0])

    # Capture webcam feed and detect faces
    video_capture = cv2.VideoCapture(0)

    while True:
        ret, frame = video_capture.read()

        # Find all the faces in the current frame

        face_locations = face_recognition.face_locations(
            frame, number_of_times_to_upsample=1)
        face_encodings = face_recognition.face_encodings(
            frame, face_locations)

        # Loop through each face in this frame of video
        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            # See if the face is a match for the known faces
            matches = face_recognition.compare_faces(
                known_faces, face_encoding)
            name = "Unknown"

            # If a match was found, use the first one
            if True in matches:
                first_match_index = matches.index(True)
                name = known_names[first_match_index]

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35),
                          (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6),
                        font, 1.0, (255, 255, 255), 1)

            # Save new faces as images
            if name == 'Unknown':
                filename = f'faces/{len(known_faces)+1}.jpg'
                cv2.imwrite(filename, frame[top:bottom, left:right])
                known_faces.append(face_encoding)
                known_names.append(str(len(known_faces)))

        # Display the resulting image
        cv2.imshow('Video', frame)

        # Exit loop on key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release webcam and close all windows
    video_capture.release()
    cv2.destroyAllWindows()
