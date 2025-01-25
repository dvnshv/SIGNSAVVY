fetch('backgroundright.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('backg').innerHTML = data;
});
document.addEventListener('DOMContentLoaded', () => {
    const confetti = document.querySelector('.confetti');
    const numConfetti = 150;

    for (let i = 0; i < numConfetti; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.width = `${Math.random() * 10 + 5}px`;
        confettiPiece.style.height = confettiPiece.style.width;
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.position = 'absolute';
        confettiPiece.style.top = `${Math.random() * 100}vh`;
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.opacity = Math.random();
        confettiPiece.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiPiece.style.animation = `fall ${Math.random() * 3 + 2}s linear`;

        confetti.appendChild(confettiPiece);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
