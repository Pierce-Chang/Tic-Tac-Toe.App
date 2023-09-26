let fields = [
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null,
    'cross',
    null,
];

function init() {
    renderTable(fields);
}

function renderTable(fields) {
    const content = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;

            if (fields[index] === 'circle') {
                // Erstelle ein SVG-Element für den hohlen Kreis mit Animation
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100");
                svg.setAttribute("height", "100");
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", "50");
                circle.setAttribute("cy", "50");
                circle.setAttribute("r", "0"); // Starte mit einem leeren Kreis
                circle.setAttribute("stroke", "white");
                circle.setAttribute("stroke-width", "10");
                circle.setAttribute("fill", "transparent");
                const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                animate.setAttribute("attributeName", "r");
                animate.setAttribute("from", "0");
                animate.setAttribute("to", "40");
                animate.setAttribute("dur", "0.5s");
                animate.setAttribute("begin", "0s");
                animate.setAttribute("fill", "freeze");

                circle.appendChild(animate);
                svg.appendChild(circle);
                cell.appendChild(svg);
            } else if (fields[index] === 'cross') {
                // Erstelle ein SVG-Element für das animierte Kreuz
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100");
                svg.setAttribute("height", "100");
                const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line1.setAttribute("x1", "10");
                line1.setAttribute("y1", "10");
                line1.setAttribute("x2", "10"); // Ändere den x2-Wert für line1
                line1.setAttribute("y2", "90");
                line1.setAttribute("stroke", "white");
                line1.setAttribute("stroke-width", "10");
                const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line2.setAttribute("x1", "90");
                line2.setAttribute("y1", "10");
                line2.setAttribute("x2", "10"); // Ändere den x2-Wert für line2
                line2.setAttribute("y2", "90");
                line2.setAttribute("stroke", "white");
                line2.setAttribute("stroke-width", "10");
                
                svg.appendChild(line1);
                svg.appendChild(line2);
                cell.appendChild(svg);
                
                // Erstelle eine Animation für das Kreuz
                const animateLine1 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                animateLine1.setAttribute("attributeName", "x2");
                animateLine1.setAttribute("from", "10");
                animateLine1.setAttribute("to", "90"); // Ändere den to-Wert für line1
                animateLine1.setAttribute("dur", "0.5s");
                animateLine1.setAttribute("begin", "0s");
                animateLine1.setAttribute("fill", "freeze");
                
                const animateLine2 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                animateLine2.setAttribute("attributeName", "x2");
                animateLine2.setAttribute("from", "90");
                animateLine2.setAttribute("to", "10"); // Ändere den to-Wert für line2
                animateLine2.setAttribute("dur", "0.5s");
                animateLine2.setAttribute("begin", "0s");
                animateLine2.setAttribute("fill", "freeze");
                
                line1.appendChild(animateLine1);
                line2.appendChild(animateLine2);
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    content.innerHTML = ''; // Lösche den vorhandenen Inhalt
    content.appendChild(table);
}
