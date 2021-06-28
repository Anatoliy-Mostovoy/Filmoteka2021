// import { refs } from './variables';
// import {paginationMyLibrary}from '../index';
// //* экземпляр класса API

// const { bodyEl, myLibraryButton, wBtn, qBtn} = refs;
//  //* поиск id фильма
// bodyEl.addEventListener('click', testWhatButtonIsIt);
// wBtn.addEventListener('click', renderWatched);
// qBtn.addEventListener('click', renderQueue);
// // myLibraryButton.addEventListener('click', onMyLibraryButtonClick)

// export let library = [];
// let arrOfIds = [];
// let currentButtonSwitch = null;

// function testWhatButtonIsIt(e) {
//     if (e.target.dataset.modal === 'watched') {
//         return addToWatched(e);
//     }else if (e.target.dataset.modal === 'queue') {
//         return addToQueue(e);
//     }else{return;}
// }

// function addArrOfIds(nameIds) {
//   return  arrOfIds = localStorage.getItem(`${nameIds}`) ? JSON.parse(localStorage.getItem(`${nameIds}`)) : [];

// }


// function getId(ev) {
//     // console.log(ev.target.getAttribute('data-action'))
//     return ev.target.getAttribute('data-action');
// }

// //* добавляем id фильма в WATCHED (localStorageWatched)
// function addToWatched(e) {
//     const nameIds = 'watched';
//     const liId = getId(e)
//     addArrOfIds(nameIds)
//     if (arrOfIds.includes(liId)) {
//         return;
//     }

//     arrOfIds.push(liId);
//     localStorage.setItem('watched', JSON.stringify(arrOfIds));
//     // addCurrentOnButton(e)
// }

// //* добавляем id фильма в QUEUE (localStorageQueue)
// function addToQueue(e) {
//     const nameIds = 'queue'
//     const liId = getId(e)
//     addArrOfIds(nameIds)
//     if (arrOfIds.includes(liId)) {
//         return;
//     }
//     arrOfIds.push(liId);
//     localStorage.setItem('queue', JSON.stringify(arrOfIds));
// }

// //* Функция рендера списка Watched
// async function renderWatched(e) {
//     e.preventDefault();
//     removeCurrentOnButton(e);
//     addCurrentOnButton(e);

//     const nameIds = 'watched';

    
//     const localArr = addArrOfIds(nameIds);

//     paginationMyLibrary.startPagination(localArr);
// }


// //* Функция рендера списка Queue
// async function renderQueue(e) {
//     e.preventDefault();
//     removeCurrentOnButton(e)
//     addCurrentOnButton(e)

//     const nameIds = 'queue';

//     const localArr = addArrOfIds(nameIds);
//     paginationMyLibrary.startPagination(localArr);
// }

// export function renderMyLibrary(e) {
//     removeCurrentOnButton(e)

//     const allIds = [...addArrOfIds('queue'), ...addArrOfIds('watched')];
//     paginationMyLibrary.startPagination(allIds);
// }

// function addCurrentOnButton(e) {
//     e.target.classList.add('current-header-btn');
//     currentButtonSwitch = e.target;
// }
// function removeCurrentOnButton(e) {
//     if(currentButtonSwitch === null)return;
//     currentButtonSwitch.classList.remove('current-header-btn');
// }

// ----------------------------------------------
// -------КОД ЮЛЯ
import { refs } from './variables';

import { paginationMyLibrary } from '../index';

import {showSpinner} from './spinner'
//* экземпляр класса API

const { bodyEl, cardsList, wBtn, qBtn} = refs;
 //* поиск id фильма
bodyEl.addEventListener('click', testWhatButtonIsIt);
wBtn.addEventListener('click', renderWatched);
qBtn.addEventListener('click', renderQueue);
//myLibraryButton.addEventListener('click', onMyLibraryButtonClick)

export let library = [];
let arrOfIds = [];
let currentButtonSwitch = null;
const currentButtonClass = 'current-header-btn';

function testWhatButtonIsIt(e) {
    const element = e.target
    if (element.dataset.modal === 'watched') { 
        return addOrRemoveTestOnButtonModal(element, 'watched', 'queue');
    }else if (element.dataset.modal === 'queue') {
        return addOrRemoveTestOnButtonModal(element, 'queue', 'watched');
    }else{return;}
}

function addArrOfIds(nameIds) {
  return  arrOfIds = localStorage.getItem(`${nameIds}`) ? JSON.parse(localStorage.getItem(`${nameIds}`)) : [];

}


function getId(element) {
    return element.getAttribute('data-action');

}

//* добавляем id фильма в WATCHED (localStorageWatched)
function addToLocalStorageWatchedOrQueue(element, action) {
    element.textContent = `remove to ${action}`;
    const nameIds = action;
    const liId = getId(element)
    addArrOfIds(nameIds)
    if (arrOfIds.includes(liId)) {
        return;
    }

    arrOfIds.push(liId);
    addToLocaleStorage(arrOfIds, action);
}


function addArrOfIds(nameIds) {
  return  arrOfIds = localStorage.getItem(`${nameIds}`) ? JSON.parse(localStorage.getItem(`${nameIds}`)) : [];

//* Функция рендера списка Watched
async function renderWatched(e) {
    showSpinner();

    e.preventDefault();
    removeCurrentOnButton(e);
    addCurrentOnButton(e);
}


//* Функция рендера списка Watched
export function renderWatched() {
    const nameIds = 'watched';

    refs.cardsList.setAttribute('data-list', `${nameIds}`);

    const localArr = addArrOfIds(nameIds);
    paginationMyLibrary.startPagination(localArr);
}

//* Функция рендера списка Queue
 function renderQueue(e) {
    showSpinner();

    removeCurrentOnButton(e)
    addCurrentOnButton(e)

    const nameIds = 'queue';
    refs.cardsList.setAttribute('data-list', `${nameIds}`);

    const localArr = addArrOfIds(nameIds);
    paginationMyLibrary.startPagination(localArr);
}

export function renderMyLibrary() {
    showSpinner();
    removeCurrentOnButton()

    const allIds = [...addArrOfIds('queue'), ...addArrOfIds('watched')];
    paginationMyLibrary.startPagination(allIds);
}


function addCurrentOnButton(e) {
    e.target.classList.add(currentButtonClass);
    currentButtonSwitch = e.target;
}
function removeCurrentOnButton() {
    if(currentButtonSwitch === null)return;
    currentButtonSwitch.classList.remove(currentButtonClass);
}

export function addOrRemoveOnOpenModal(action) {
    const element = document.querySelector(`[data-modal="${action}"]`);
    const testOnLocal = JSON.parse(localStorage.getItem(`${action}`)).includes(element.getAttribute('data-action'));
    element.textContent = testOnLocal ? `remove to ${action}` : `add to ${action}`;
    if(testOnLocal){
        element.classList.add(currentButtonClass)
       }else{
           element.classList.remove(currentButtonClass) 
       };
}


function addOrRemoveTestOnButtonModal(element,action, actionRemove) {

        if(!element.classList.contains(currentButtonClass)){
             element.classList.add(currentButtonClass)
             addToLocalStorageWatchedOrQueue(element, action)
             const removeElement = document.querySelector(`[data-modal="${action === 'watched' ? 'queue' : 'watched'}"]`)
            removeElement.classList.remove(currentButtonClass)
             removeFromLocalStorage(removeElement, actionRemove);
            }else{
                element.classList.remove(currentButtonClass);
                removeFromLocalStorage(element, action);
            };
}

function removeFromLocalStorage(element, action) {
    element.textContent = `add to ${action}`;
    const storageElement = addArrOfIds(action);
    const elementId = element.dataset.action;
    const searchId = storageElement.indexOf(elementId);
    if (searchId === -1) {
        return;
    }
    storageElement.splice(searchId, 1);
    addToLocaleStorage(storageElement, action);

    if (cardsList.dataset.list === "library" || cardsList.dataset.list === "home") {
        return;
    };
    paginationMyLibrary.startPagination(storageElement);

}

function addToLocaleStorage(array, action) {
    localStorage.setItem(action, JSON.stringify(array));

}

