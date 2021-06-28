import { refs } from './variables';

const { header, searchForm, headerButtons, navigationHeader, buttonBlockHeader, userButton, myLibraryButton} = refs;

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
       
} else {

    if (buttonBlockHeader.classList.contains('header-hidden')) {
      buttonBlockHeader.classList.remove('hidden');
      navigationHeader.classList.remove('mini-header');
      header.classList.remove('empty-library');
      userButton.classList.remove('header-hidden');
    }
  }
}
