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

export function addOrRemoveOnOpenModal(action) {
    const element = document.querySelector(`[data-modal="${action}"]`);
    const testOnLocal = JSON.parse(localStorage.getItem(`${action}`)).includes(element.getAttribute('data-action'));
    element.textContent = testOnLocal ? `remove to ${action}` : `add to ${action}`;
    if(testOnLocal){
        element.classList.add('current-header-btn')
       }else{
           element.classList.remove('current-header-btn') 
       };
}


function addOrRemoveTestOnButtonModal(element,action, actionRemove) {
        if(!element.classList.contains('current-header-btn')){
             element.classList.add('current-header-btn')
             addToLocalStorageWatchedOrQueue(element, action)
             const removeElement = document.querySelector(`[data-modal="${action === 'watched' ? 'queue' : 'watched'}"]`)
            //  action === 'watched' ? 'queue' : 'watched';
             removeFromLocalStorage(removeElement, actionRemove);
            }else{
                element.classList.remove('current-header-btn');
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
    return addToLocaleStorage(storageElement, action);
}

function addToLocaleStorage(array, action) {
    localStorage.setItem(action, JSON.stringify(array));
}