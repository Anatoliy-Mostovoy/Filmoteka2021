import { refs } from "./variables";

const { header, searchForm, headerButtons, navigationHeader, buttonBlockHeader } = refs;

const callback = entries => {
    entries.forEach(entry => {
        if (entry.intersectionRatio === 0) {
            addClassByobserver();
        }

        if (entry.intersectionRatio === 1) {
            removeClassByobserver()
        }
                
  });
}



var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}


let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.js-element-observer'));


function addClassByobserver() {
    header.classList.add('mini-header');
    searchForm.classList.add('hidden');
    headerButtons.classList.add('hidden');
    navigationHeader.classList.add('mini-header');

}

function removeClassByobserver() {
    header.classList.remove('mini-header');
    searchForm.classList.remove('hidden');
    headerButtons.classList.remove('hidden');
    navigationHeader.classList.remove('mini-header');
}


// checkIfEmptyLibrary
export function checkIfEmptyLibrary () {
    if (localStorage.getItem('watched') === null && localStorage.getItem('queue')=== null) {
        buttonBlockHeader.classList.add('header-hidden');
        navigationHeader.classList.add('mini-header');
        header.classList.add('empty-library');
} else {
    if (buttonBlockHeader.classList.contains('header-hidden')) {
        buttonBlockHeader.classList.remove('header-hidden');
        navigationHeader.classList.remove('mini-header');
        header.classList.remove('empty-library');
    }
    }
}


