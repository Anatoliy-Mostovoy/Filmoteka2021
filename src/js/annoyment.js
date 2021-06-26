import { refs } from "./variables";
// import { identif } from './fb'
// console.log('Oksana', identif);

const { annoymentModal, closeAnnoyment, overlay } = refs;

let promDelay = 5000;
    let timeOpenedModal = 20000;
const MAX_PROMT_MODAL = 3;
let userSubscribed = false;
let timerCloseModal = null;
let timerOpenModal = null;
let counterOpenedModal = 0;

     if (localStorage.getItem('userName')) {
    userSubscribed = true
     } else {
         checkingTheOpeningCondition()
     }

function checkingTheOpeningCondition() {
    if (counterOpenedModal >= MAX_PROMT_MODAL || userSubscribed === true) {
        return;
    }
    
openModalOnTimer(); 
}

function openModalOnTimer() {
  timerOpenModal = setTimeout(() => {    
      openModal()
  }, promDelay)
}


function openModal() {
    counterOpenedModal += 1;
    annoymentModal.classList.remove('cat-hidden');
    timerCloseModal = setTimeout(() => { closeModal() }, timeOpenedModal);
};
 

function closeModal() {
    annoymentModal.classList.add('cat-hidden');
    checkingTheOpeningCondition()
};

closeAnnoyment.addEventListener('click', closeToAnnoyment);
function closeToAnnoyment() {
    clearTimeout(timerOpenModal);
    closeModal();
    }

export { closeToAnnoyment };