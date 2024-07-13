from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

def get_data():
    # Conectar a la base de datos
    conn = sqlite3.connect('contar_personas.db')
    cursor = conn.cursor()

    # Obtener todos los registros de la tabla 'conteo'
    cursor.execute('SELECT * FROM conteo')
    rows = cursor.fetchall()

    # Cerrar la conexión
    conn.close()
    return rows

@app.route('/')
def index():
    data = get_data()
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
