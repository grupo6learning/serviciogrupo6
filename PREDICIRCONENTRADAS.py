import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Datos de entrada: semanas y días (añadidos hasta la semana 10)
semanas = np.array([
    1, 1, 1, 1, 1, 1, 1, 
    2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8,
    9, 9, 9, 9, 9, 9, 9,
    10, 10, 10, 10, 10, 10, 10
], dtype=float)
dias = np.array([
    0, 1, 2, 3, 4, 5, 6, 
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6,
    0, 1, 2, 3, 4, 5, 6
], dtype=float)

# Concatenar semanas y días en una sola matriz de entrada
entradas = np.vstack((semanas, dias)).T

# Datos de salida: cantidad de personas (añadidos datos correspondientes)
personas = np.array([
    116, 120, 124, 127, 134, 170, 190, 
    120, 124, 130, 125, 130, 175, 210,
    130, 135, 145, 125, 135, 185, 210,
    140, 145, 147, 127, 130, 195, 220,
    145, 150, 149, 124, 132, 205, 225,
    143, 148, 150, 126, 129, 204, 230,
    150, 155, 160, 130, 140, 210, 235,
    155, 160, 165, 135, 145, 215, 240,
    160, 165, 170, 140, 150, 220, 245,
    165, 170, 175, 145, 155, 225, 250
], dtype=float)

# Normalización de datos
scaler_entradas = StandardScaler()
scaler_personas = StandardScaler()

entradas_normalizadas = scaler_entradas.fit_transform(entradas)
personas_normalizadas = scaler_personas.fit_transform(personas.reshape(-1, 1))

# Definir el modelo
model = keras.Sequential([
    layers.Dense(units=64, input_shape=[2], activation='relu', kernel_regularizer=keras.regularizers.l2(0.001)),
    layers.Dropout(0.2),
    layers.Dense(units=32, activation='relu', kernel_regularizer=keras.regularizers.l2(0.001)),
    layers.Dropout(0.2),
    layers.Dense(units=16, activation='relu', kernel_regularizer=keras.regularizers.l2(0.001)),
    layers.Dense(units=1)
])

# Compilar el modelo con una tasa de aprendizaje más pequeña
model.compile(optimizer=keras.optimizers.Adam(learning_rate=0.001), loss='mean_squared_error')

# Entrenar el modelo
model.fit(entradas_normalizadas, personas_normalizadas, epochs=2000, verbose=False)

# Definir función para realizar predicciones
def predecir_aforo(semanas_nuevas, dias_nuevos, modelo, scaler_entradas, scaler_personas):
    # Verificar que la longitud de semanas_nuevas y dias_nuevos sea la misma
    if len(semanas_nuevas) != len(dias_nuevos):
        raise ValueError("Las listas de semanas y días deben tener la misma longitud.")

    # Crear la matriz de entradas con las nuevas semanas y días
    nuevas_entradas = np.vstack((semanas_nuevas, dias_nuevos)).T

    # Normalizar las nuevas entradas
    nuevas_entradas_normalizadas = scaler_entradas.transform(nuevas_entradas)

    # Realizar la predicción
    predicciones_normalizadas = modelo.predict(nuevas_entradas_normalizadas)

    # Desnormalizar las predicciones
    predicciones = scaler_personas.inverse_transform(predicciones_normalizadas)

    return predicciones

# Ejemplo de uso de la función
semanas_nuevas = np.array([11, 12], dtype=float)
dias_nuevos = np.array([3, 4], dtype=float)

predicciones = predecir_aforo(semanas_nuevas, dias_nuevos, model, scaler_entradas, scaler_personas)

# Mostrar las predicciones
for i in range(len(predicciones)):
    print(f"Semana: {semanas_nuevas[i]}, Día: {dias_nuevos[i]}, Predicción de aforo: {predicciones[i][0]}")

# Mantener la consola abierta
while True:
    try:
        continuar = input("¿Deseas realizar otra predicción? (s/n): ").strip().lower()
        if continuar == 'n':
            break
        else:
            semanas_nuevas = list(map(float, input("Ingresa las semanas nuevas (separadas por espacios): ").split()))
            dias_nuevos = list(map(float, input("Ingresa los días nuevos (separados por espacios): ").split()))
            predicciones = predecir_aforo(semanas_nuevas, dias_nuevos, model, scaler_entradas, scaler_personas)
            for i in range(len(predicciones)):
                print(f"Semana: {semanas_nuevas[i]}, Día: {dias_nuevos[i]}, Predicción de aforo: {predicciones[i][0]}")
    except Exception as e:
        print(f"Error: {e}")
        continue
