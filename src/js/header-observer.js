import { refs } from './variables';

const { header, searchForm, headerButtons, navigationHeader, buttonBlockHeader,
   userButton, backgroundEmpty, cardsList, mainContainer, wBtn,  qBtn, paginationBlock} = refs;

const callback = entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 0) {
      addClassByobserver();
    }

    if (entry.intersectionRatio === 1) {
      removeClassByobserver();
    }
  });
};

var options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.js-element-observer'));

function addClassByobserver() {
  header.classList.add('mini-header');
  searchForm.classList.add('hidden');
  headerButtons.classList.add('hidden');
  userButton.classList.add('hidden');
  navigationHeader.classList.add('mini-header');
 
}

function removeClassByobserver() {
  header.classList.remove('mini-header');
  searchForm.classList.remove('hidden');
  headerButtons.classList.remove('hidden');
  userButton.classList.remove('hidden');
  navigationHeader.classList.remove('mini-header');
  
   
}
// myLibraryButton.addEventListener('click', checkIfEmptyLibrary)

export function checkIfEmptyLibrary () {
    if (localStorage.getItem('watched') === null && localStorage.getItem('queue')=== null ||
    localStorage.getItem('watched')&&localStorage.getItem('queue') &&localStorage.getItem('watched').length<3 && localStorage.getItem('queue').length<3 ||
    localStorage.getItem('watched')&&localStorage.getItem('watched').length<3&&localStorage.getItem('queue')=== null ||
    localStorage.getItem('queue')&&localStorage.getItem('queue').length<3&&localStorage.getItem('watched')=== null ) {
        buttonBlockHeader.classList.add('hidden');
        navigationHeader.classList.add('mini-header');
        header.classList.add('empty-library');
        userButton.classList.add('header-hidden');
        backgroundEmpty.classList.remove('hidden');
        cardsList.classList.add('empty-main');
        mainContainer.classList.add('empty-main');
        paginationBlock.classList.add('hidden');


       
} else {

    if (buttonBlockHeader.classList.contains('header-hidden')) {
      buttonBlockHeader.classList.remove('hidden');
      navigationHeader.classList.remove('mini-header');
      header.classList.remove('empty-library');
      userButton.classList.remove('header-hidden');
      backgroundEmpty.classList.add('hidden');
      cardsList.classList.remove('empty-main');
      mainContainer.classList.remove('empty-main');
      paginationBlock.classList.remove('hidden');
    }
  }
}

// wBtn.addEventListener('click', emptyWatched);
// qBtn.addEventListener('click', emptyQueue);

//empty-watch

export function emptyWatched() {
   backgroundEmpty.classList.add('hidden');
  if (localStorage.getItem('watched') === null || localStorage.getItem('watched')&&localStorage.getItem('watched').length<3) {
    backgroundEmpty.classList.add('empty-choice');
    backgroundEmpty.classList.remove('hidden');
    cardsList.classList.add('empty-choice');
    mainContainer.classList.add('empty-choice');
    paginationBlock.classList.add('hidden');
  }
  else {
    backgroundEmpty.classList.remove('empty-choice');
    backgroundEmpty.classList.add('hidden');
    cardsList.classList.remove('empty-choice');
    mainContainer.classList.remove('empty-choice');
    paginationBlock.classList.remove('hidden');
  }
}

export function emptyQueue() {
  backgroundEmpty.classList.add('hidden');
 if (localStorage.getItem('queue') === null || localStorage.getItem('queue')&&localStorage.getItem('queue').length<3) {
   backgroundEmpty.classList.add('empty-choice');
   backgroundEmpty.classList.remove('hidden');
   cardsList.classList.add('empty-choice');
   mainContainer.classList.add('empty-choice');
   paginationBlock.classList.add('hidden');
 }
 else {
   backgroundEmpty.classList.remove('empty-choice');
   backgroundEmpty.classList.add('hidden');
   cardsList.classList.remove('empty-choice');
   mainContainer.classList.remove('empty-choice');
   paginationBlock.classList.remove('hidden');
 }
}

