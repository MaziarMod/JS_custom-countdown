const inputContainer = document.querySelector('#input-container');
const countdownForm = document.querySelector('#countdownForm');
const dateElement = document.querySelector('#date-picker');

const countdownElement = document.querySelector('#countdown');
const countdownElementTitle = document.querySelector('#countdown-title');
const countdownBtn = document.querySelector('#countdown-button');
const timeElements = document.querySelectorAll('span');

const completeElement = document.querySelector('#complete');
const completeElementInfo = document.querySelector('#complete-info');
const completeBtn = document.querySelector('#complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24


// Set Date Input Min with Today's Date (2020-09-25T23:25:15.562Z)
const today = new Date().toISOString().split('T')[0]; //2020-09-25

// define minium date that will show in date picker
dateElement.setAttribute('min', today); 

// populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now - 1;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        
        // Hide Input 
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0 ){
            countdownElement.hidden =true;
            clearInterval(countdownActive);
            completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeElement.hidden = false;
        }else {

            // Populate Countdown
            countdownElementTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeElement.hidden =true;
            countdownElement.hidden = false;
        }
        
    }, second);
}

// Take Values from Form Input
function updateCountdown(e){
 e.preventDefault();  
 countdownTitle = e.srcElement[0].value;
 countdownDate = e.srcElement[1].value;
 
 savedCountdown = {
     title: countdownTitle,
     date: countdownDate
 }
 localStorage.setItem('countdown', JSON.stringify(savedCountdown));

 if (countdownDate) {
     // Get number version of date e.g: 2020-06-04 = 1591228800000
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
 } else {
    alert('Please select a date for the countdown');
 }
 
}

// Reset All Valuse
function reset() {
   // Show Input 
   inputContainer.hidden = false;
   // Hide Complete   
   completeElement.hidden = true; 
   // hide Countdown
   countdownElement.hidden = true; 
   //stop the countdown
   clearInterval(countdownActive);
   // reset values
   countdownTitle = '';
   countdownDate = '';
   localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM(); 
    }
}
// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);


// on load, check localStorage
restorePreviousCountdown();

