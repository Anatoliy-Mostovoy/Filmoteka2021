import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

import { refs } from './variables';
// import filmCards from '../templates/mylibrary.hbs'
// import FilmsApiService from './api-content'
import { renderUserLibrary } from './f-render-user-library';

import { filmiId } from './f-get-id-film';

import { showSpinner } from './spinner';

// файл конфигурации web app's Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCeeGI9asqn4tm9e6RPTw7398rO1eRYinY',
  authDomain: 'filmoteka-84a5d.firebaseapp.com',
  databaseURL: 'https://filmoteka-84a5d-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-84a5d',
  storageBucket: 'filmoteka-84a5d.appspot.com',
  messagingSenderId: '230509239947',
  appId: '1:230509239947:web:adccdfbaeb50091e247e8e',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export { database };

// let identif = false;

const { myLibraryButton, wBtn, qBtn, cardsList, bodyEl } = refs;
// const { formSignup, formSigning } = refs;

// formSigning.addEventListener('submit', onLogin);
// formSignup.addEventListener('submit', onRegister);

// bodyEl.addEventListener('click', getIdFilm);

myLibraryButton.addEventListener('click', onClickMyLibrary);
wBtn.addEventListener('click', onClickBtnWatched);
qBtn.addEventListener('click', onClickBtnQueue);

// функция callback при клике на кнопку Watched
async function onClickBtnWatched(e) {
  showSpinner();
  // console.log('obj при первом клике', obj);
  const userId = firebase.auth().currentUser.uid;
  const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value');
  const dataLibrary = queryDataLibrary.val();

  e.preventDefault();
  // cardsList.innerHTML = '';

  renderUserLibrary(
    dataLibrary.watched,
  ); /* // отправляет запрос на сервер для получения данных фильмов и отрисовывает*/
}

// функция callback при клике на кнопку Queue
async function onClickBtnQueue(e) {
  showSpinner();
  const userId = firebase.auth().currentUser.uid;
  const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value');
  const dataLibrary = queryDataLibrary.val();
  // console.log('dataLibrary', dataLibrary.queue);
  e.preventDefault();
  // cardsList.innerHTML = '';

  renderUserLibrary(
    dataLibrary.queue,
  ); /* // отправляет запрос на сервер для получения данных фильмов и отрисовывает*/
}

// функция callback при клике на MyLibrary
async function onClickMyLibrary(e) {
  showSpinner();
  // console.log('моя-измененная', identif);
  const userId = firebase.auth().currentUser.uid;
  const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value');
  const dataLibrary = queryDataLibrary.val();
  console.log('dataLibrary', dataLibrary.watched);

  if (dataLibrary.watched[0] == '' && dataLibrary.queue[0] == '') {
    console.log('TRUE');
    alert('Ваша библиотека пуста');
  } else {
    const dataLibraryArr = [...dataLibrary.watched, ...dataLibrary.queue];
    console.log('dataLibraryArr', dataLibraryArr);

    e.preventDefault();
    // cardsList.innerHTML = '';

    renderUserLibrary(dataLibraryArr);
  }
}

export function onClikBtnFilmModal(evt) {
  /*функция проверки на какую кнопку нажал пользователь watched или queue*/
  // console.log(event);
  // проверяем на какую кнопку нажал пользователь
  if (evt.target.classList.contains('js-watched')) {
    console.log('нажал watched');
    // console.log('Айдишник из ', filmiId);
    // передать id
    updateUserLibrary(filmiId, 'watched');
  }

  if (evt.target.classList.contains('js-queue')) {
    // console.log('нажал queue');
    // console.log('Айдишник из ', filmiId);
    // передать id
    updateUserLibrary(filmiId, 'queue');
  }
}

// // Firebase
// async function writeInBase(arr, id, onBtn) {
//   const updateDataLibrary = await firebase.database().ref(`users/${userId}/${onBtn}`).set(arr);
//   alert('фильм успешно добавлен');
// };

// async function updateUserLibrary(id, onBtn) {
//   const userId = firebase.auth().currentUser.uid;
//   // // //console.log(identified);
//   try {
//     const queryDataLibrary = await firebase.database().ref(`users/${userId}/${onBtn}`).once('value')
//     const dataLibrary = queryDataLibrary.val()

//     if (dataLibrary[0] === '') {
//       dataLibrary.splice(0, 1, id);
//       const updateDataList = await firebase.database().ref(`users/${userId}/${onBtn}`).set(dataLibrary);
//       // writeInBase(dataLibrary, id, onBtn);
//       return;
//     } else {
//       dataLibrary.push(id);
//       const updateDataList = await firebase.database().ref(`users/${userId}/${onBtn}`).set(dataLibrary)
//     };

//     // проверка нет ли в другой очереди такого фильма  - ИЗМЕНИТЬ НА ПРОВЕРКУ КЛАССА КНОПКИ!!!
//     // Если вторая кнопка не активна ---- считать очередь, и удалить нужный id из єтой очереди
//     // if (onBtn === 'wathed') {
//     //   if (dataLibrary.queue.findIndex(id) === -1) {
//     //     return;
//     //   } else {
//     //     dataLibrary.queue.splice(dataLibrary.queue.findIndex(id), 1);
//     //     const updateDataList = await firebase.database().ref(`users/${userId}/queue`).set(dataLibrary);
//     //   }
//     // };

//     // if (onBtn === 'queue') {
//     //   if (dataLibrary.watched.findIndex(id) === -1) {
//     //     return;
//     //   } else {
//     //     dataLibrary.queue.splice(dataLibrary.watched.findIndex(id), 1);
//     //     const updateDataList = await firebase.database().ref(`users/${userId}/watched`).set(dataLibrary);
//     //   }
//     // };
