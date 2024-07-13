const { createServer } = require('node:http');
const hostname = '0.0.0.0';
const port = 8096;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World grupo 6 machine learning');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conteo de Personas</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #e0f7fa;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        header {
            text-align: center;
            margin-bottom: 20px;
        }
        h1 {
            color: #00796b;
            font-size: 3em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        h2.title {
            color: white; /* Títulos de las secciones en blanco */
        }
        main {
            display: flex;
            justify-content: center;
        }
        table {
            width: 100%;
            max-width: 800px;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        th, td {
            border: 1px solid #ddd;
            padding: 15px;
            text-align: center;
        }
        th {
            background-color: #4CAF50;
            color: white;
            font-size: 1.2em;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #ddd;
        }
        @media (max-width: 600px) {
            h1 {
                font-size: 2em;
            }
            th, td {
                padding: 10px;
            }
        }
        .content {
            margin-top: 20px;
            text-align: center;
        }
        .content .title {
            color: #00796b;
            font-size: 2em;
            margin-bottom: 10px;
        }
        .content p {
            font-size: 1.2em;
            margin-bottom: 15px;
        }
        .content .map img {
            border: 1px solid #ddd;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .navbar {
            display: flex;
            justify-content: space-around;
            background-color: #333;
            padding: 10px 0;
            width: 100%;
            box-sizing: border-box;
        }
        .navbar a {
            color: white;
            text-decoration: none;
            padding: 14px 20px;
            font-size: 1.2em; /* Tamaño de la letra aumentado */
        }
        .navbar a:hover {
            background-color: #ddd;
            color: black;
        }
        section {
            margin: 50px 0; /* Añade espacio entre secciones */
        }
        .calendar-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
        }
        .calendar-controls button {
            background-color: #00796b;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 1em;
            cursor: pointer;
        }
        .calendar-controls button:hover {
            background-color: #004d40;
        }
        .calendar {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
        .calendar .month {
            border: 1px solid #ddd;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 10px;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
        }
        .calendar .month h3 {
            margin-top: 0;
            color: #00796b;
        }
        .calendar .month table {
            width: 100%;
            border-collapse: collapse;
        }
        .calendar .month th, .calendar .month td {
            border: 1px solid #ddd;
            padding: 5px;
            text-align: center;
        }
        .calendar .month th {
            background-color: #4CAF50;
            color: white;
        }
        .current-day {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>

    <div class="navbar">
        <a href="#conteo-de-personas">Conteo de Personas</a>
        <a href="#nuestra-objetivo">Nuestra Objetivo</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#ubicacion">Ubicación</a>
        <a href="#mercado-andahuaylas">Mercado de Andahuaylas</a>
        <a href="#calendario">Calendario</a>
    </div>

    <header class="content" id="conteo-de-personas">
        <h2 class="title">Inicio</h2>
        <p>
            ¡Bienvenidos a nuestra página dedicada al conteo de personas en el Mercado Modelo de Andahuaylas! Este espacio ha sido creado con el objetivo de recopilar y analizar datos sobre el flujo de personas en el mercado, proporcionando información valiosa para mejorar la experiencia de visitantes y comerciantes. Aquí podrás encontrar informes detallados del conteo de personas, el contacto de los usuarios y la ubicación del mercado.
        </p>
        <div class="btn-home">
        </div>
    </header>

    <header>
        <h1>Conteo de Personas</h1>
    </header>
    <main>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tiempo Hora</th>
                    <th>Contador Personas</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí se llenará dinámicamente con los datos -->
                {% for row in data %}
                <tr>
                    <td>{{ row[0] }}</td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </main>

    <!-- Sección de nuestro objetivo -->
    <section class="content" id="nuestra-objetivo">
        <h2 class="title">Nuestra Objetivo</h2>
        <p>La nuestra idea principal es recopilar datos precisos sobre el ingreso de personas al Mercado Modelo de Andahuaylas. Con esta información, buscamos evitar aglomeraciones y mejorar la experiencia de los visitantes y comerciantes. Para lograr esto, realizamos un conteo detallado de personas que entran al mercado, analizando variables como la hora, el día. Nuestra misión es proporcionar datos fiables y útiles que puedan ser utilizados para una mejor organización y planificación del mercado, contribuyendo así a un entorno más seguro y eficiente para todos.</p>
    </section>

    <!-- Sección de nosotros -->
    <section class="content" id="nosotros">
        <h2 class="title">Nosotros</h2>
        <p>
            Polo Guia, Carlos Enrique<br>
            Quispe Huari, Marlon Brandon<br>
            Chucos Hinostroza, Deivi<br>
            Zapata Rojas, Julián José<br>
            Tarazona LLashag, Alexander<br>
        </p>
    </section>
   
    <!-- Sección de ubicación -->
    <section class="content" id="ubicacion">
        <h2 class="title">Ubicación</h2>
        <figure class="map">
           <img src="{{ url_for('static', filename='mapa1.png') }}" height="400px" width="80%" alt="mapa">
        </figure>
    </section>

    <!-- Sección de mercado Andahuaylas -->
    <section class="content" id="mercado-andahuaylas">
        <h2 class="title">Mercado de Andahuaylas</h2>
        <figure class="map">
            <img src="{{ url_for('static', filename='mapa2.png') }}" height="400px" width="80%" alt="mapa">
        </figure>
    </section>

    <!-- Sección del calendario -->
    <section class="content" id="calendario">
        <h2 class="title">Calendario</h2>
        <div class="calendar-controls">
            <button id="prevMonth">Anterior</button>
            <h3 id="calendarTitle"></h3>
            <button id="nextMonth">Siguiente</button>
        </div>
        <div class="calendar" id="calendar"></div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const months = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth();

            const calendarTitle = document.getElementById('calendarTitle');
            const calendarContainer = document.getElementById('calendar');
            const prevMonthBtn = document.getElementById('prevMonth');
            const nextMonthBtn = document.getElementById('nextMonth');

            function renderCalendar(year, month) {
                calendarTitle.textContent = `${months[month]} ${year}`;
                calendarContainer.innerHTML = generateCalendar(year, month);
                markCurrentDay();
            }

            function generateCalendar(year, month) {
                const today = new Date();
                const currentDay = today.getDate();
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                let calendarHtml = `
                    <table>
                        <thead>
                            <tr>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miércoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                                <th>Sábado</th>
                                <th>Domingo</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                let day = 1;
                for (let i = 0; i < 6; i++) {
                    calendarHtml += "<tr>";
                    for (let j = 0; j < 7; j++) {
                        if (i === 0 && j < firstDay) {
                            calendarHtml += "<td></td>";
                        } else if (day > daysInMonth) {
                            calendarHtml += "<td></td>";
                        } else {
                            if (year === today.getFullYear() && month === today.getMonth() && day === currentDay) {
                                calendarHtml += `<td class="current-day">${day}</td>`;
                            } else {
                                calendarHtml += `<td>${day}</td>`;
                            }
                            day++;
                        }
                    }
                    calendarHtml += "</tr>";
                }
                calendarHtml += `
                        </tbody>
                    </table>
                `;
                return calendarHtml;
            }

            function markCurrentDay() {
                const today = new Date();
                const currentDay = today.getDate();
                const monthYear = `${months[today.getMonth()]} ${today.getFullYear()}`;
                const monthContainers = document.querySelectorAll('.calendar .month');
                monthContainers.forEach(container => {
                    if (container.querySelector('h3').textContent === monthYear) {
                        const days = container.querySelectorAll('td');
                        days.forEach(day => {
                            if (parseInt(day.textContent) === currentDay) {
                                day.classList.add('current-day');
                            } else {
                                day.classList.remove('current-day');
                            }
                        });
                    }
                });
            }

            prevMonthBtn.addEventListener('click', function() {
                if (currentMonth === 0) {
                    currentMonth = 11;
                    currentYear--;
                } else {
                    currentMonth--;
                }
                renderCalendar(currentYear, currentMonth);
            });

            nextMonthBtn.addEventListener('click', function() {
                if (currentMonth === 11) {
                    currentMonth = 0;
                    currentYear++;
                } else {
                    currentMonth++;
                }
                renderCalendar(currentYear, currentMonth);
            });

            renderCalendar(currentYear, currentMonth);
        });
    </script>
</body>
</html>
