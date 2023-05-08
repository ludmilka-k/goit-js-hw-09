import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),

}
refs.startBtn.disabled = true;
const TIMER_INTERVAL = 1000;
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnBacklash);

const fp = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
       const selectedDate = selectedDates[0].getTime();
       const nowDate = new Date().getTime();

       if (selectedDate < nowDate) {
        Notiflix.Notify.failure('Please choose a date in the future.');
        refs.startBtn.disabled = true;
       } else {
        refs.startBtn.disabled = false;
       }
    },
  },
);


  function onStartBtnBacklash() {
    // stopTimer();
    createTimer();
    refs.startBtn.disabled = true;
  }

  function stopTimer() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
  }

  function createTimer() {
    intervalId = setInterval(updateTimer, TIMER_INTERVAL);
  }

  function updateTimer() {
    const timeLeftValue = calculateDate();
    console.log(timeLeftValue);
    refs.days.textContent = timeLeftValue.days; 
    refs.hours.textContent = timeLeftValue.hours; 
    refs.minutes.textContent = timeLeftValue.minutes; 
    refs.seconds.textContent = timeLeftValue.seconds; 
  }

  function calculateDate() {
    const selectedDate = fp.selectedDates[0].getTime();
    const now = new Date();
    const timeDifference = selectedDate - now;
    const timeLeftObj = convertMsToObj(timeDifference);
    if(timeDifference < TIMER_INTERVAL) {
        stopTimer();
    }
    return timeLeftObj
  }

  function convertMsToObj(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }


