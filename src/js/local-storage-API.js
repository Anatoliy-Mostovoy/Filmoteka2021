import { refs } from './variables';
import { paginationMyLibrary } from '../index';
import {showSpinner} from './spinner'
import {updateUserLibrary} from './fb';
//* экземпляр класса API

const { bodyEl, cardsList } = refs;
 //* поиск id фильма
bodyEl.addEventListener('click', testWhatButtonIsIt);

export let library = [];
let arrOfIds = [];
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

//* Функция рендера списка Watched
export function renderWatched() {
    const nameIds = 'watched';

    refs.cardsList.setAttribute('data-list', `${nameIds}`);
    const localArr = addArrOfIds(nameIds);

    paginationMyLibrary.startPagination(localArr);
}

//* Функция рендера списка Queue
export function renderQueue() {
    const nameIds = 'queue';
    refs.cardsList.setAttribute('data-list', `${nameIds}`);
    const localArr = addArrOfIds(nameIds);
    paginationMyLibrary.startPagination(localArr);
}

export function renderMyLibrary() {
    const allIds = [...addArrOfIds('queue'), ...addArrOfIds('watched')];
    paginationMyLibrary.startPagination(allIds);
}

export function addOrRemoveOnOpenModal(action) {
    const element = document.querySelector(`[data-modal="${action}"]`);
    let testOnLocal = true;
    if(localStorage.getItem('firebase:host:filmoteka-84a5d-default-rtdb.firebaseio.com')){
        //* юля встав функцію
        //  testOnLocal = 
        return;
    }else{

         testOnLocal = testOLocal(element, action);
    }
    element.textContent = testOnLocal ? `remove to ${action}` : `add to ${action}`;
    if(testOnLocal){
        element.classList.add(currentButtonClass)
       }else{
           element.classList.remove(currentButtonClass) 
       };
}

function testOLocal(element, action) {
    return JSON.parse(localStorage.getItem(`${action}`)).includes(element.getAttribute('data-action'));
}


function addOrRemoveTestOnButtonModal(element,action, actionRemove) {

        if(!element.classList.contains(currentButtonClass)){
             element.classList.add(currentButtonClass)

             const removeElement = document.querySelector(`[data-modal="${action === 'watched' ? 'queue' : 'watched'}"]`)
            removeElement.classList.remove(currentButtonClass)
            //* тут перепірку
            if(localStorage.getItem('firebase:host:filmoteka-84a5d-default-rtdb.firebaseio.com')){
                updateUserLibrary(element.dataset.action, action);
                //* ремув юля
                return;
            };
            addToLocalStorageWatchedOrQueue(element, action)
             removeFromLocalStorage(removeElement, actionRemove);
            }else{
                element.classList.remove(currentButtonClass);
                if(localStorage.getItem('firebase:host:filmoteka-84a5d-default-rtdb.firebaseio.com')){
                    //*remove юля
                    return;
                };
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