const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const modes = document.querySelectorAll('.mode');
const circle = document.querySelector('.ring-progress');
const bell = document.getElementById('bell');
const themeToggle = document.getElementById('theme-toggle');
const countDisplay = document.getElementById('count');

const circumference = 2 * Math.PI * 140;
circle.style.strokeDasharray = circumference;

let timer, totalSeconds = 25 * 60, remainingSeconds = totalSeconds, isRunning = false, pomodoros = 0;

function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
    const secs = (remainingSeconds % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${mins}:${secs}`;
    
    const offset = circumference - (remainingSeconds / totalSeconds) * circumference;
    circle.style.strokeDashoffset = offset;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');

    timer = setInterval(() => {
        remainingSeconds--;
        updateDisplay();
        if (remainingSeconds <= 0) {
            clearInterval(timer);
            bell.play();
            if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
            pomodoros++;
            countDisplay.textContent = pomodoros;
            localStorage.setItem('pomodoros', pomodoros);
            isRunning = false;
            startBtn.classList.remove('hidden');
            pauseBtn.classList.add('hidden');
        }
    }, 1000);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
});
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    remainingSeconds = totalSeconds;
    updateDisplay();
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
});

modes.forEach(mode => {
    mode.addEventListener('click', () => {
        modes.forEach(m => m.classList.remove('active'));
        mode.classList.add('active');
        totalSeconds = mode.dataset.time * 60;
        remainingSeconds = totalSeconds;
        updateDisplay();
        clearInterval(timer);
        isRunning = false;
        startBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    });
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('light') ? 'Modo oscuro' : 'Modo claro';
});

updateDisplay();
pomodoros = localStorage.getItem('pomodoros') || 0;
countDisplay.textContent = pomodoros;