document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const resetButton = document.getElementById('reset-button');
    const colorButtons = document.querySelectorAll('.color-btn');

    const gridSize = 20 * 20;
    const storageKey = 'pixelArtState';

    // Kaydedilmiş durumu yükle
    let gridState = JSON.parse(localStorage.getItem(storageKey)) || Array(gridSize).fill('#ffffff');

    let currentColor = '#ff0000'; // başlangıç rengi

    // Aktif renk butonunu işaretle
    colorButtons.forEach(btn => {
        if (btn.dataset.color === currentColor) btn.classList.add('active');

        btn.addEventListener('click', () => {
            currentColor = btn.dataset.color;
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const cells = [];

    // Grid oluştur
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = gridState[i] || '#ffffff';

        cell.addEventListener('click', () => {
            cell.style.backgroundColor = currentColor;
            gridState[i] = currentColor;
            localStorage.setItem(storageKey, JSON.stringify(gridState));
        });

        gridContainer.appendChild(cell);
        cells.push(cell);
    }

    // Sıfırlama
    resetButton.addEventListener('click', () => {
        if (confirm("Tüm çizimi silip beyaza dönmek istediğine emin misin?")) {
            cells.forEach(cell => {
                cell.style.backgroundColor = '#ffffff';
            });
            gridState = Array(gridSize).fill('#ffffff');
            localStorage.setItem(storageKey, JSON.stringify(gridState));
        }
    });
});