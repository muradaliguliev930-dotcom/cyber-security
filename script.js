// ЧАСТЬ 1: ФОН С ЧАСТИЦАМИ
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 255, 157, 0.5)';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let count = (canvas.height * canvas.width) / 12000;
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let dx = (Math.random() * 0.6) - 0.3;
        let dy = (Math.random() * 0.6) - 0.3;
        particlesArray.push(new Particle(x, y, dx, dy, size));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();


// ЧАСТЬ 2: ОКНО ПРОЕКТОВ (МОДAЛКА)
const btnProjects = document.getElementById('btnProjects');
const btnClose = document.getElementById('btnClose');
const modalWindow = document.getElementById('modalWindow');
const terminalInput = document.getElementById('terminalInput');

btnProjects.addEventListener('click', () => {
    modalWindow.classList.add('open');
    // Фокусируемся на поле ввода сразу при открытии окна
    setTimeout(() => terminalInput.focus(), 100);
});

btnClose.addEventListener('click', () => {
    modalWindow.classList.remove('open');
});

modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow) {
        modalWindow.classList.remove('open');
    }
});


// ЧАСТЬ 3: РАБОТА ИНТЕРАКТИВНОГО ТЕРМИНАЛА
const terminalOutput = document.getElementById('terminalOutput');

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = terminalInput.value.trim();
        
        if (command !== '') {
            // Реагируем на пасхалки или команды пользователя
            if (command.toLowerCase() === 'help') {
                terminalOutput.innerText = "Доступные инфо-коды: \n> status - проверка сети\n> clear - очистить";
            } else if (command.toLowerCase() === 'status') {
                terminalOutput.innerText = "Система: Ок\nПользователь: Adam_Net\nБаза: Активна";
            } else if (command.toLowerCase() === 'clear') {
                terminalOutput.innerText = "";
            } else {
                // Если введена любая другая строка — просто выводим её на экран
                terminalOutput.innerText = "Вы ввели: " + command;
            }
            
            // Очищаем поле ввода для нового текста
            terminalInput.value = '';
        }
    }
});
