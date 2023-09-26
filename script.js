let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

let gameEnded = false; // Flag, um das Spielende zu verfolgen

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

            if (!fields[index] && !gameEnded) {
                // Füge das onclick-Attribut hinzu, wenn das Spiel nicht vorbei ist
                cell.setAttribute("onclick", `handleClick(${index})`);
            }

            if (fields[index] === 'circle') {
                // Füge das Kreis-SVG mit generateCircleSVG ein
                cell.innerHTML = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                // Füge das Kreuz-SVG mit generateCrossSVG ein
                cell.innerHTML = generateCrossSVG();
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    content.innerHTML = ''; // Lösche den vorhandenen Inhalt
    content.appendChild(table);
}

function handleClick(index) {
    // Überprüfe, ob das Feld bereits belegt ist oder das Spiel vorbei ist
    if (!fields[index] && !gameEnded) {
        // Setze das Symbol des aktuellen Spielers im Feld und aktualisiere das Spielfeld
        fields[index] = currentPlayer;

        // Wechsle zum anderen Spieler
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

        renderTable(fields);

        // Überprüfe, ob das Spiel beendet wurde
        checkGameEnd();
    } else if (gameEnded) {
        // Wenn das Spiel vorbei ist, starte es neu, wenn auf das Spielfeld geklickt wird
        resetGame();
    }
}

function checkGameEnd() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale
        [0, 4, 8], [2, 4, 6] // Diagonale
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Wenn eine der Siegeskombinationen erreicht wurde
            gameEnded = true;

            // Zeichne die Siegeslinie
            drawWinningLine(a, c);
            return;
        }
    }

    // Überprüfe, ob das Spiel unentschieden ist
    if (fields.every(field => field)) {
        gameEnded = true;
    }
}

function drawWinningLine(startIndex, endIndex) {
    const content = document.getElementById('content');
    const table = document.querySelector('table');
    const tableRect = table.getBoundingClientRect();
    const cellSize = tableRect.width / 3;
    const lineWidth = 5;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = tableRect.width;
    canvas.height = tableRect.height;
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '1';

    const startX = cellSize * (startIndex % 3 + 0.5);
    const startY = cellSize * (Math.floor(startIndex / 3) + 0.5);
    const endX = cellSize * (endIndex % 3 + 0.5);
    const endY = cellSize * (Math.floor(endIndex / 3) + 0.5);

    context.strokeStyle = '#FFFFFF';
    context.lineWidth = lineWidth;
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();

    content.appendChild(canvas);
}

function resetGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'circle';
    gameEnded = false;

    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.remove();
    }

    renderTable(fields);
}

function generateCircleSVG() {
    const svgInnerHTML = `
    <svg width="90" height="90">
    <circle cx="45" cy="45" r="40" fill="transparent" stroke="#00b0EF" stroke-width="10">
        <animate attributeName="stroke-dasharray" from="0 283" to="283 283" dur="125ms" fill="freeze" />
    </circle>
</svg>
    `;

    return svgInnerHTML;
}

function generateCrossSVG() {
    const svgCode = `
        <svg width="100" height="100">
            <line x1="10" y1="10" x2="90" y2="90" stroke="#FFC000" stroke-width="10">
                <animate attributeName="x2" from="10" to="90" dur="125ms" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="10" to="90" dur="125ms" begin="0s" fill="freeze" />
            </line>
            <line x1="90" y1="10" x2="10" y2="90" stroke="#FFC000" stroke-width="10">
                <animate attributeName="x2" from="90" to="10" dur="125ms" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="10" to="90" dur="125ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}