import { refs } from './variables';
import {paginationMyLibrary}from '../index';
//* экземпляр класса API

const { bodyEl, myLibraryButton, wBtn, qBtn} = refs;
 //* поиск id фильма
bodyEl.addEventListener('click', testWhatButtonIsIt);
wBtn.addEventListener('click', renderWatched);
qBtn.addEventListener('click', renderQueue);
// myLibraryButton.addEventListener('click', onMyLibraryButtonClick)

export let library = [];
let arrOfIds = [];
let currentButtonSwitch = null;

function testWhatButtonIsIt(e) {
    if (e.target.dataset.modal === 'watched') {
        return addToWatched(e);
    }else if (e.target.dataset.modal === 'queue') {
        return addToQueue(e);
    }else{return;}
}

function addArrOfIds(nameIds) {
  return  arrOfIds = localStorage.getItem(`${nameIds}`) ? JSON.parse(localStorage.getItem(`${nameIds}`)) : [];

}


function getId(ev) {
    // console.log(ev.target.getAttribute('data-action'))
    return ev.target.getAttribute('data-action');
}

//* добавляем id фильма в WATCHED (localStorageWatched)
function addToWatched(e) {
    const nameIds = 'watched';
    const liId = getId(e)
    addArrOfIds(nameIds)
    if (arrOfIds.includes(liId)) {
        return;
    }

    arrOfIds.push(liId);
    localStorage.setItem('watched', JSON.stringify(arrOfIds));
    // addCurrentOnButton(e)
}

//* добавляем id фильма в QUEUE (localStorageQueue)
function addToQueue(e) {
    const nameIds = 'queue'
    const liId = getId(e)
    addArrOfIds(nameIds)
    if (arrOfIds.includes(liId)) {
        return;
    }
    arrOfIds.push(liId);
    localStorage.setItem('queue', JSON.stringify(arrOfIds));
}

//* Функция рендера списка Watched
async function renderWatched(e) {
    e.preventDefault();
    removeCurrentOnButton(e);
    addCurrentOnButton(e);

    const nameIds = 'watched';

    
    const localArr = addArrOfIds(nameIds);

    paginationMyLibrary.startPagination(localArr);
}


//* Функция рендера списка Queue
async function renderQueue(e) {
    e.preventDefault();
    removeCurrentOnButton(e)
    addCurrentOnButton(e)

    const nameIds = 'queue';

    const localArr = addArrOfIds(nameIds);
    paginationMyLibrary.startPagination(localArr);
}

export function renderMyLibrary(e) {
    removeCurrentOnButton(e)

    const allIds = [...addArrOfIds('queue'), ...addArrOfIds('watched')];
    paginationMyLibrary.startPagination(allIds);
}

function addCurrentOnButton(e) {
    e.target.classList.add('current-header-btn');
    currentButtonSwitch = e.target;
}
function removeCurrentOnButton(e) {
    if(currentButtonSwitch === null)return;
    currentButtonSwitch.classList.remove('current-header-btn');
}
