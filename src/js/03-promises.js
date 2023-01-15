import Notiflix from "notiflix";

const form = document.querySelector(".form");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise ((resolve,reject)=>{
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`Fullfilled promise ${position} on ${delay}!`);
        } else {
          reject(`Rejected promise ${position} on ${delay}`);
        }
      },delay)
    
  })  
}


function onSubmitHandler(event){
  event.preventDefault();
  let {delay,step,amount} = event.currentTarget.elements;
  
  let timeDelay = Number(delay.value);
  let increment = Number(step.value);
  let quantity = Number(amount.value);
  
  for(let pos = 1; pos <= quantity; pos++){
    createPromise(pos, timeDelay)
      .then((success) => Notiflix.Notify.success(success))
      .catch((error) => Notiflix.Notify.failure(error));
    
    timeDelay += increment;
  }  
  event.currentTarget.reset()
}

form.addEventListener("submit",onSubmitHandler);