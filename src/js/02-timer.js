import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from "notiflix";
Notiflix.Report.init(
    {
        width:'350px',
        timeout:1000,
        cssAnimation: "zoom",
        titleMaxLength: 50,  
    }
);

const options = {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose(selectedDates,dateStr,instance) {
        const now = new Date();
        const chosenDate = new Date(selectedDates[0]);

        if(now < chosenDate){
            if(!timer.isActive) btn.removeAttribute("disabled");
        }
        else{
            Notiflix.Report.failure("Please enter the date in the future!","TRY ONCE MORE");
            btn.setAttribute("disabled",true); 
        }
    },
  };
 //  UI timer obj
const timerUIObj = {
    days: document.querySelector("[data-days]"),
    hours : document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds : document.querySelector("[data-seconds]"),
}

const btn = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker")
btn.setAttribute('disabled',true);
flatpickr(input,options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    let days = Math.floor(ms / day);
    // Remaining hours
    let hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    let minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    let seconds = Math.floor((((ms % day) % hour) % minute) / second);

    days = addLeadingZero(days);
    hours = addLeadingZero(hours);
    minutes = addLeadingZero(minutes);
    seconds = addLeadingZero(seconds);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(item){
    return String(item).padStart(2,"0");
}

function updateUI(currValues){
    for(let key in timerUIObj){
        timerUIObj[key].textContent = currValues[key];
        console.log(timerUIObj[key].textContent)
    }
}

// class Timer

class Timer{
    constructor({onTick}={}){
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }

    countDown(inputValue){
        let chosenTime = new Date(inputValue);
        let timeDelta = chosenTime.getTime() - Date.now();

        if(timeDelta > 0 && !this.isActive){
            btn.setAttribute("disabled",true);
            this.isActive = true;
            this.intervalId = setInterval(() => {
                timeDelta = chosenTime.getTime() - Date.now();
                if(timeDelta <= 1000){
                    this.stop()
                }
                let currentValues = convertMs(timeDelta);
                updateUI(currentValues);
            },1000);
        }
        else{
            Notiflix.Report.warning("Please update your time"," AND TRY ONCE MORE");
            btn.setAttribute('disabled',true);
        } 
    }

    stop(){
        clearInterval(this.intervalId);
        this.isActive = false;
        Notiflix.Notify.success("Countdown has finished!",{
            cssAnimation:"form-left",
        }); 
        return;
    }
}

let timer = new Timer({
    onTick:updateUI
});

btn.addEventListener("click", () => {
    timer.countDown(input.value);
});