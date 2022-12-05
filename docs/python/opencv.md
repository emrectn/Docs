## Opencv


#### Adding Face Blur For Face Detection
````python
    x1, y1, x2, y2, _ = face['face_points']
    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

    # create a blank rectangle with white color
    # rect = np.full((y2-y1, x2-x1, 3), 255, dtype=np.uint8)

    # add rectangle with weight
    # image[y1:y2, x1:x2] = cv2.addWeighted(image[y1:y2, x1:x2], alpha, rect, 1-alpha, 0.0)

    image = cv2.rectangle(image, (x1, y1), (x2, y2), (231, 194, 0), 3)
    image = cv2.putText(image, face['emotion'], (x1, y1 - margin), cv2.FONT_HERSHEY_SIMPLEX, 1, (153, 231, 0), 2, cv2.LINE_AA)
````
