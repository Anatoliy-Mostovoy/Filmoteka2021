import { refs } from './variables';
import FilmsApiService from './api-content';
import filmCards from '../templates/mylibrary.hbs';
import { checkIfEmptyLibrary } from './header-observer';
import {paginationMyLibrary}from '../index';
//* экземпляр класса API
const newFilmsApi = new FilmsApiService();

const { bodyEl, cardsList, myLibraryButton, wBtn, qBtn, homeButton} = refs;
 //* поиск id фильма
bodyEl.addEventListener('click', testWhatButtonIsIt);
wBtn.addEventListener('click', renderWatched);
qBtn.addEventListener('click', renderQueue);
myLibraryButton.addEventListener('click', onMyLibraryButtonClick)

// let liId = null;
let localStorageWatched = localStorage.getItem('watched') ? localStorage.getItem('watched') : ''; //* local storage watched
let localStorageQueue = localStorage.getItem('queue') ? localStorage.getItem('queue') : '';  //* local storage queue
export let library = [];
let arrOfIds = [];
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
    addCurrentOnButton(e)
    const nameIds = 'watched';
    e.preventDefault();
    
    const localArr = addArrOfIds(nameIds);

    paginationMyLibrary.startPagination(localArr);

}


//* Функция рендера списка Queue
async function renderQueue(e) {

    const nameIds = 'queue'

    e.preventDefault();
    const localArr = addArrOfIds(nameIds);
    paginationMyLibrary.startPagination(localArr);


}

function onMyLibraryButtonClick(e) {
    const allIds = [...addArrOfIds('queue'), ...addArrOfIds('watched')];
    paginationMyLibrary.startPagination(allIds);

}

// let splitItem; //* test


//! Удаление id не работает
// function deleteWatchedFilm() {
//     if (localStorage.getItem('watched').split(',').includes(liId)) {
//         let localStorageArr = localStorage.getItem('watched').split(',');
//         localStorageArr = localStorageArr.filter(id=> id!==liId)
//         console.log(localStorageArr);



// //* удаление id из очереди
// function deleteQueueFilm() {
//   localStorage.removeItem(key);
//   //* вызов функции изменения названия кнопки
// }


//* удаление класса анимации, чтоб она повторялась
function addCurrentOnButton(e) {
    e.target.parentNode.classList.add('current');
    // e.target.classList.add('current');
    // e.target.cardsList.add('current');
}
function removeCurrentOnButton(e) {
    e.target.cardsList.remove('current');
}
