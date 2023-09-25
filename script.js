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
    render()
}

function render() {
    const content = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;
            if (fields[index] === 'circle') {
                cell.innerText = 'O';
                cell.className = 'circle';
            } else if (fields[index] === 'cross') {
                cell.innerText = 'X';
                cell.className = 'cross';
            }
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    content.innerHTML = '';
    content.appendChild(table);
}
