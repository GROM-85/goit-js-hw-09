const btnContainer = document.querySelector(".container");
const body = document.querySelector("body");
const btnStart = document.querySelector("[data-start]")
const btnStop = document.querySelector("[data-stop]")
let intervalId;

function getRandomHexColor(){
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function start(){
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    },1000);
    btnStart.setAttribute("disabled","true");
    btnStop.removeAttribute("disabled");
}

function stop(){
    clearInterval(intervalId);
    btnStop.setAttribute("disabled","true");
    btnStart.removeAttribute("disabled");
}

btnContainer.addEventListener("click",(event) =>{
    let isStart = event.target.dataset.start === "start"? true: false
    if(isStart){
        start();
    }else{
        stop();
    }
})


