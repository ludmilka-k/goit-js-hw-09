function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bg = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;

const TIMER_INTERVAL = 1000;
let intervalId = null;

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

function changeBgColor() {
  const bgColor = getRandomHexColor();
  bg.style.backgroundColor = bgColor;
}

function start() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalId = setInterval(changeBgColor, TIMER_INTERVAL);
  console.log(`Interval with id ${intervalId} installed!`);
}

function stop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalId);
  console.log(`Interval with id ${intervalId} has stopped!`);
}
