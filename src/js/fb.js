
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

import { refs } from "./variables"
// import filmCards from '../templates/mylibrary.hbs'
// import FilmsApiService from './api-content'
// import { renderUserLibrary } from './f-render-user-library'
import {paginationMyLibrary}from '../index';

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

// let identif = false;
let idCurrentUser = null;

const { myLibraryButton, wBtn, qBtn, cardsList, bodyEl} = refs;

// bodyEl.addEventListener('click', getIdFilm);

myLibraryButton.addEventListener('click', onClickMyLibrary);
wBtn.addEventListener('click', onClickBtnWatched);
qBtn.addEventListener('click', onClickBtnQueue);

// функция callback при клике на кнопку Watched
async function onClickBtnWatched(e) {
  // console.log('obj при первом клике', obj);
  // const userId = firebase.auth().currentUser.uid;
  // const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value')
  const queryDataLibrary = await readUserLibrary();
  const dataLibrary = queryDataLibrary.val();
  // console.log('watched', dataLibrary);

  e.preventDefault();
  
  if (dataLibrary.watched[0] == '') {
    // cardsList.innerHTML = "";
    return;
  }

  paginationMyLibrary.startPagination(dataLibrary.watched);
};

// функция callback при клике на кнопку Queue
async function onClickBtnQueue(e) {
  const queryDataLibrary = await readUserLibrary();
  // const userId = firebase.auth().currentUser.uid;
  // const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value')
  const dataLibrary = queryDataLibrary.val()
  // console.log('dataLibrary', dataLibrary.queue);
  e.preventDefault();
  cardsList.innerHTML = "";

  if (dataLibrary.queue[0] == '') {
    return;
  }
  paginationMyLibrary.startPagination(dataLibrary.queue);
};

// функция считыванния данных из БД
function readUserLibrary() {
  const userId = firebase.auth().currentUser.uid;
  return firebase.database().ref(`users/${userId}`).once('value')
};

// функция callback при клике на MyLibrary
async function onClickMyLibrary(e) {
  // console.log('моя-измененная', identif);
  const queryDataLibrary = await readUserLibrary()
  const dataLibrary = queryDataLibrary.val()
  // console.log('dataLibrary', dataLibrary.watched);
    e.preventDefault();
    // cardsList.innerHTML = "";

  if (dataLibrary.watched[0] == '') {
    if (dataLibrary.queue[0] == '') {
      alert('Ваша библиотека пуста');
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

export function onClikBtnFilmModal(evt) {                  /*функция проверки на какую кнопку нажал пользователь watched или queue*/
  // console.log(event);
  // проверяем на какую кнопку нажал пользователь
  if (evt.target.classList.contains('js-watched')) {
    // console.log('нажал watched');
    // console.log('Айдишник из ', filmiId);
    updateUserLibrary(filmiId, 'watched');
  };

  if (evt.target.classList.contains('js-queue')) {
    // console.log('нажал queue');
    // console.log('Айдишник из ', filmiId);
    updateUserLibrary(filmiId, 'queue');
  };
};

// // Firebase
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
    console.log(error.message)
    throw error
  }
};

// // слушатель firebase
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User

//     // export function currentUserId() {
//     //   return user.uid;
//     // }

//     idCurrentUser = user.uid;
//     console.log('idCurrentUser', idCurrentUser);
//     const displayName = user.displayName;
//     const email = user.email;
//     const photoURL = user.photoURL;
//     const emailVerified = user.emailVerified;
//     //   console.log('displayName', displayName);
//     //   console.log('email', email);
//   } else {
//     // User is signed out
//     // ...
//     console.log('вы не авторизованы');
//     // myLibraryButton.removeEventListener('click', onClickMyLibrary);
//   }
// });
// // --------------------------------------------------
// export { idCurrentUser };