import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const submitBtn = document.querySelector('.form button');

form.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    console.log({ position, newDelay: delay });
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay});
      }
    }, delay);
  });
}

function onFormSubmit(evn) {
  evn.preventDefault();
  submitBtn.disabled = true;
  console.log(evn.currentTarget.elements);
  const {elements: { step, amount, delay }} = evn.currentTarget;
  const promises = [];
  for (let i = 1; i <= amount.valueAsNumber; i++) {
    const newDelay = delay.valueAsNumber + ((i-1 )* step.valueAsNumber);
    promises.push(createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      }));
  }

  Promise.all(promises)
    .finally(() => {submitBtn.disabled = false});
}
