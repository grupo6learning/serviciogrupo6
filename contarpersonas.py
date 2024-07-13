import sqlite3
import cv2
import numpy as np
import imutils
from datetime import datetime

# Conectar a la base de datos (o crearla si no existe)
conn = sqlite3.connect('contar_personas.db')
cursor = conn.cursor()

# Crear la tabla si no existe
cursor.execute('''
CREATE TABLE IF NOT EXISTS conteo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    person_count INTEGER
)
''')

conn.commit()

# Inicialización de variables y captura de video
cap = cv2.VideoCapture('video2.mp4')  
fgbg = cv2.createBackgroundSubtractorMOG2()
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
person_counter = 0

# Coordenadas del área de la puerta (polígono rosado)
area_pts = np.array([[810, 90], [930, 123], [930, 210], [810, 180]])

# Coordenadas de la línea de conteo horizontal (recta)
line_x1, line_y1 = 810, 170  # Coordenada inicial de la línea
line_x2, line_y2 = 930, 190  # Coordenada final de la línea (misma Y para que sea horizontal)

# Diccionario para almacenar la posición anterior del centro del contorno
prev_centers = {}

while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame = imutils.resize(frame, width=1280)  # Ajustar el tamaño si es necesario

    # Determinamos el área sobre la cual actuará el detector de movimiento
    imAux = np.zeros(shape=(frame.shape[:2]), dtype=np.uint8)
    imAux = cv2.drawContours(imAux, [area_pts], -1, (255), -1)
    image_area = cv2.bitwise_and(frame, frame, mask=imAux)    

    # Obtendremos la imagen binaria donde la región en blanco representa
    # la existencia de movimiento
    fgmask = fgbg.apply(image_area)
    fgmask = cv2.morphologyEx(fgmask, cv2.MORPH_OPEN, kernel)
    fgmask = cv2.morphologyEx(fgmask, cv2.MORPH_CLOSE, kernel)
    fgmask = cv2.dilate(fgmask, None, iterations=2)

    # Encontramos los contornos presentes en fgmask
    cnts, _ = cv2.findContours(fgmask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for i, cnt in enumerate(cnts):
        if cv2.contourArea(cnt) > 500:  # Ajustar el umbral para detectar personas
            x, y, w, h = cv2.boundingRect(cnt)
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 255), 2)

            # Verifica si el centro del contorno ha cruzado la línea de conteo
            center_x = x + w / 2
            center_y = y + h / 2
            
            # Almacenar el centro actual
            current_center = (center_x, center_y)

            # Si el contorno tiene un centro anterior, verificar la dirección
            if i in prev_centers:
                prev_center = prev_centers[i]
                prev_center_x, prev_center_y = prev_center

                if prev_center_y > line_y1 and center_y < line_y1:  # Dirección de abajo hacia arriba
                    person_counter += 1
                    cv2.line(frame, (line_x1, line_y1), (line_x2, line_y2), (0, 255, 0), 3)

                    # Obtener el timestamp local
                    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                    # Insertar el conteo en la base de datos
                    cursor.execute('INSERT INTO conteo (timestamp, person_count) VALUES (?, ?)', (timestamp, person_counter))
                    conn.commit()

            # Actualizar el centro anterior
            prev_centers[i] = current_center

    # Visualización del área y la línea de conteo
    cv2.drawContours(frame, [area_pts], -1, (255, 0, 255), 2)
    # Dibujar el rectángulo verde usando las coordenadas de area_pts
    cv2.rectangle(frame, (min(area_pts[:, 0]), min(area_pts[:, 1])), (max(area_pts[:, 0]), max(area_pts[:, 1])), (0, 255, 0), 2)
    cv2.line(frame, (line_x1, line_y1), (line_x2, line_y2), (0, 255, 255), 2)
    cv2.putText(frame, str(person_counter), (820, 80), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 2)

    cv2.imshow('frame', frame)
    k = cv2.waitKey(1) & 0xFF
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()

# Cerrar la conexión a la base de datos
conn.close()
