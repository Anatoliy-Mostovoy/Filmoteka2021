
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

import { refs } from "./variables"
import { paginationMyLibrary } from '../index'

import { renderMyLibrary } from './local-storage-API'
import { renderWatched } from './local-storage-API'
import { renderQueue } from './local-storage-API'

import { filmiId } from './f-get-id-film'

// файл конфигурации web app's Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCeeGI9asqn4tm9e6RPTw7398rO1eRYinY",
  authDomain: "filmoteka-84a5d.firebaseapp.com",
  databaseURL: "https://filmoteka-84a5d-default-rtdb.firebaseio.com",
  projectId: "filmoteka-84a5d",
  storageBucket: "filmoteka-84a5d.appspot.com",
  messagingSenderId: "230509239947",
  appId: "1:230509239947:web:adccdfbaeb50091e247e8e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export { database };

const { myLibraryButton, cardsList, bodyEl} = refs;


// функция отрисовки списка просмотренные из БД при клике на кнопку Watched
async function renderWatchedDB() {
  const queryDataLibrary = await readUserLibrary();
  const dataLibrary = queryDataLibrary.val();
  // console.log('watched', dataLibrary);

  if (dataLibrary.watched[0] == '') {
    cardsList.innerHTML = "";
    return;
  }

  paginationMyLibrary.startPagination(dataLibrary.watched);
};

// функция отрисовки списка просмотренные из БД при клике на кнопку Queue
async function renderQueueDB() {
  const queryDataLibrary = await readUserLibrary();
  const dataLibrary = queryDataLibrary.val()

  if (dataLibrary.queue[0] == '') {
    cardsList.innerHTML = "";
    return;
  }
  paginationMyLibrary.startPagination(dataLibrary.queue);
};

// функция считыванния данных из БД
function readUserLibrary() {
  const userId = firebase.auth().currentUser.uid;
  return firebase.database().ref(`users/${userId}`).once('value')
};

// ----------------------------------
// ------------------------------------
export function onClikBtnFilmModal(evt) {                  /*функция проверки на какую кнопку нажал пользователь watched или queue*/
  // console.log(event);
  if (evt.target.classList.contains('js-watched')) {
    // console.log('нажал watched');
    updateUserLibrary(filmiId, 'watched');
  };

  if (evt.target.classList.contains('js-queue')) {
    // console.log('нажал queue');
    updateUserLibrary(filmiId, 'queue');
  };
};

// функция отрисовки MyLibraryDB
async function renderLibraryDB() {
  const queryDataLibrary = await readUserLibrary()
  const dataLibrary = queryDataLibrary.val()

  if (dataLibrary.watched[0] == '') {
    if (dataLibrary.queue[0] == '') {
      // alert('Ваша библиотека пуста');
      cardsList.innerHTML = "";
      return;
    } else {
      paginationMyLibrary.startPagination(dataLibrary.queue);
    }
  } else {
    if (dataLibrary.queue[0] == '') {
      paginationMyLibrary.startPagination(dataLibrary.watched);
    } else {
      const dataLibraryArr = [...dataLibrary.watched, ...dataLibrary.queue];
      paginationMyLibrary.startPagination(dataLibraryArr);
    }
  }
};

// функция обновления данных в БД
async function updateUserLibrary(id, onBtn) {
  const userId = firebase.auth().currentUser.uid;
  try {
    const queryDataLibrary = await firebase.database().ref(`users/${userId}/${onBtn}`).once('value')
    const dataLibrary = queryDataLibrary.val()
  
    if (dataLibrary[0] === '') {
      dataLibrary.splice(0, 1, id);
      const updateDataList = await firebase.database().ref(`users/${userId}/${onBtn}`).set(dataLibrary);
      // writeInBase(dataLibrary, id, onBtn);
      return;
    } else {
      dataLibrary.push(id);
      const updateDataList = await firebase.database().ref(`users/${userId}/${onBtn}`).set(dataLibrary)
    };
  } catch (error) {
    // console.log(error.message)
    throw error
  }
};

// // слушатель firebase для MyLibrary
export function renderLibrary() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      renderLibraryDB();
    } else {
      renderMyLibrary();
      console.log('вы не авторизованы');
    }
  });
};

// // слушатель firebase для Watched
export function renderMyWatched() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      renderWatchedDB();
    } else {
      renderWatched();
      console.log('вы не авторизованы');
    }
  });
};

// // слушатель firebase для Queue
export function renderMyQueue() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      renderQueueDB();
    } else {
      renderQueue();
      console.log('вы не авторизованы');
    }
  });
};
// // -------------------------------------------------- 
//* пробую