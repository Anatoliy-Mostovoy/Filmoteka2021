import { refs } from './variables';
import FilmsApiService from './api-content';

import filmCards from '../templates/mylibrary.hbs';

import { checkIfEmptyLibrary } from './header-observer';

// var pagination = require('./maryska');
// import PaginationMyLibrary from './pagination-for-my-library';
// const paginationMyLibrary = new PaginationMyLibrary();
// console.log(paginationMyLibrary);
import {paginationMyLibrary}from '../index';



//* экземпляр класса API
const newFilmsApi = new FilmsApiService();

const { bodyEl, cardsList, myLibraryButton, wBtn, qBtn, homeButton} = refs;
 //* поиск id фильма
bodyEl.addEventListener('click', addToWatched); //* поиск и добавление в Watched
bodyEl.addEventListener('click', addToQueue); //* поиск и добавление в Queue
wBtn.addEventListener('click', renderWatched);
qBtn.addEventListener('click', renderQueue);
homeButton.addEventListener('click', removeAnimation);
myLibraryButton.addEventListener('click', onMyLibraryButtonClick)

// let liId = null;
let localStorageWatched = localStorage.getItem('watched') ? localStorage.getItem('watched') : ''; //* local storage watched
let localStorageQueue = localStorage.getItem('queue') ? localStorage.getItem('queue') : '';  //* local storage queue
export let library = [];
let arrOfIds = [];

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
    if (e.target.dataset.modal !== 'watched') {
        return;
    }
    const liId = getId(e)
    addArrOfIds(nameIds)
    if (arrOfIds.includes(liId)) {
        return;
    }

    arrOfIds.push(liId);
    localStorage.setItem('watched', JSON.stringify(arrOfIds));
}

//* добавляем id фильма в QUEUE (localStorageQueue)
function addToQueue(e) {
    const nameIds = 'queue'
    if (e.target.dataset.modal !== 'queue') {
        return;
    }
    console.log(e.target.dataset.action);
    const liId = getId(e)
    addArrOfIds(nameIds)
    if (arrOfIds.includes(liId)) {
        return;
    }

    arrOfIds.push(liId);
    localStorage.setItem('queue', JSON.stringify(arrOfIds));
}

function startPagination(arrayIds) {
    library =[];
    const promises = arrayIds.map(el => {
        return  newFilmsApi.fetchInformationAboutFilm(el).then(addLibrary)

    });
    Promise.all(promises).then(makePagin);
}

//* Функция рендера списка Watched
async function renderWatched(e) {
    cardsList.innerHTML = "";
    e.preventDefault();

    const localArr = addArrOfIds();

    paginationMyLibrary.startPagination(localArr);
    cardsList.classList.add('animation');
}


//* Функция рендера списка Queue
async function renderQueue(e) {
    console.log(localStorage.getItem('queue').split(','))
    cardsList.innerHTML = "";

    e.preventDefault();
    const localArr = localStorage.getItem('queue').split(',');

    startPagination(localArr);

    cardsList.classList.add('animation');
}

// async function addLibrary(film) {
//    await library.push(film);
//    return await film;
// }

function onMyLibraryButtonClick(e) {
    const allIds = [...addArrOfIds('queue'), ...addArrOfIds('watched')]
    paginationMyLibrary.startPagination(allIds);
}

// let splitItem; //* test


//! Удаление id не работает
// function deleteWatchedFilm() {
//     if (localStorage.getItem('watched').split(',').includes(liId)) {
//         let localStorageArr = localStorage.getItem('watched').split(',');
//         localStorageArr = localStorageArr.filter(id=> id!==liId)
//         console.log(localStorageArr);


//         // localStorage.getItem('watched').split(',').forEach(function(el, index){
//         //     if (el === liId) { //! как найти liId через forEach?
//         //         localStorage.getItem('watched').split(',').splice(index, 1);
//         //         console.log('proshlo!', localStorage.getItem('watched').split(','))
//         //     }
//         // });
//     }
// }



// //* удаление id из очереди
// function deleteQueueFilm() {
//   localStorage.removeItem(key);
//   //* вызов функции изменения названия кнопки
// }


//* удаление класса анимации, чтоб она повторялась
function removeAnimation() {
    cardsList.classList.remove('animation');
}




//* pagination
// var pag3;
// var itemsPerPage = 20;
// export function makePagin() {
//     // console.log(library)
//      pag3 = new pagination(document.getElementsByClassName('pagination')[0],
//   {
//       currentPage: 1,		// number
//       totalItems: library.length,       // number
//       itemsPerPage: 20,    // number
//       stepNum: 2,			// number
//       onInit: renderLibrary	        // function
//   });
//    pag3.onPageChanged(renderLibrary);
// }

// function renderLibrary(page) {
//     refs.cardsList.innerHTML = renderNextLibrary(page);
// }

// function renderNextLibrary(currentPage) {
//         let template = "";
//     for (let i = (currentPage - 1) * itemsPerPage; i < (currentPage * itemsPerPage) && i < library.length; i++) {

//         template += filmCards(library[i]);
//     }
    
//     return template;
// }
