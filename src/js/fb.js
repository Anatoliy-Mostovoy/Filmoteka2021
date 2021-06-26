// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/storage'
// import 'firebase/messaging'

// import { refs } from "./variables"
// // import filmCards from '../templates/mylibrary.hbs'
// // import FilmsApiService from './api-content'
// import { renderUserLibrary } from './f-render-user-library'

// // файл конфигурации web app's Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCeeGI9asqn4tm9e6RPTw7398rO1eRYinY",
//   authDomain: "filmoteka-84a5d.firebaseapp.com",
//   databaseURL: "https://filmoteka-84a5d-default-rtdb.firebaseio.com",
//   projectId: "filmoteka-84a5d",
//   storageBucket: "filmoteka-84a5d.appspot.com",
//   messagingSenderId: "230509239947",
//   appId: "1:230509239947:web:adccdfbaeb50091e247e8e"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // const database = firebase.database();

// let identif = false;
// // console.log('моя', identif);

// const { myLibraryButton, wBtn, qBtn, bodyEl} = refs;
// const { formSignup, formSigning } = refs;
// // console.log('Это кнопка 2', myLibraryButton);
// // let liId = null;
// // console.log(liId);
// let filmiId = null;

// formSigning.addEventListener('submit', onLogin);
// formSignup.addEventListener('submit', onRegister);

// bodyEl.addEventListener('click', getIdFilm);
// myLibraryButton.addEventListener('click', onClickMyLibrary);
// wBtn.addEventListener('click', onClickBtnWatched);
// qBtn.addEventListener('click', onClickBtnQueue);


// // let obj = {};
// // async function readDataLibrary() {
// //   const userId = firebase.auth().currentUser.uid;
// //   const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value')
// //   const dataLibrary = queryDataLibrary.val();
// //   // return dataLibrary;
// //   obj = dataLibrary; 
// //  };


// async function onClickBtnWatched(e) {
//   // console.log('obj при первом клике', obj);
//   const userId = firebase.auth().currentUser.uid;
//   const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value')
//   const dataLibrary = queryDataLibrary.val();

//   e.preventDefault();
//   renderUserLibrary(dataLibrary.watched);     /* // отправляет запрос на сервер для получения данных фильмов и отрисовывает*/
// };

// async function onClickBtnQueue(e) {
//   const userId = firebase.auth().currentUser.uid;
//   const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value')
//   const dataLibrary = queryDataLibrary.val()
//   // console.log('dataLibrary', dataLibrary.queue);
//   e.preventDefault();

//   renderUserLibrary(dataLibrary.queue);     /* // отправляет запрос на сервер для получения данных фильмов и отрисовывает*/
// };

// async function onClickMyLibrary(e) {
//   // console.log('моя-измененная', identif);
//   const userId = firebase.auth().currentUser.uid;
//   const queryDataLibrary = await firebase.database().ref(`users/${userId}`).once('value')
//   const dataLibrary = queryDataLibrary.val()
//   console.log('dataLibrary', dataLibrary.watched);

//   if (dataLibrary.watched[0] == '' && dataLibrary.queue[0] == '') {
//     console.log('TRUE');
//     alert('Ваша библиотека пуста');
//   } else {
//     const dataLibraryArr = [...dataLibrary.watched, ...dataLibrary.queue];
//     console.log('dataLibraryArr', dataLibraryArr);
//     e.preventDefault();

//     renderUserLibrary(dataLibraryArr);
//   };
// };  
//     // ------------------------------------
// //   const dataFilm = dataLibrary.watched.map(id => {
// //     newFilmsApi.movieId = id;
// //     console.log(newFilmsApi.movieId);
// //     return newFilmsApi.fetchInformationAboutFilm();
// //   });

// //   console.log('dataFilm', dataFilm);

// //   Promise.all(dataFilm)
// //   //   .then(response =>
    
// //   //   {
// //   //     const newArrr = response.map(r => {
// //   //       return r.json();
// //   //     });
// //   //     return newArrr;
// //   //   })
// //   //   .then(film => console.log(film))
// //   // ----------------------------------------------

// //   // // cardsList.innerHTML = "";
// //   // // evt.preventDefault();
// // };

// // функция получения Id при нажатии на карточку
// function getIdFilm(evt) {
//   // console.log(evt.target);
//   if (evt.target.className !== 'card-container js-card-container') {
//     return;
//   }
//   filmiId = evt.target.parentNode.getAttribute('data-action');
// };

// export function onClikBtnFilmModal(evt) {                  /*функция проверки на какую кнопку нажал пользователь watched или queue*/
//   // console.log(event);
//   // проверяем на какую кнопку нажал пользователь
//   if (evt.target.classList.contains('js-watched')) {
//     console.log('нажал watched');
//     // console.log('Айдишник из ', filmiId);
//     // передать id
//     updateUserLibrary(filmiId, 'watched');
//   };

//   if (evt.target.classList.contains('js-queue')) {
//     // console.log('нажал queue');
//     // console.log('Айдишник из ', filmiId);
//     // передать id
//     updateUserLibrary(filmiId, 'queue');
//   };
// };

// // функция callback при нажатии на кнопку login
// function onLogin(evt) {
//   evt.preventDefault();

//   const email = evt.currentTarget.elements.email.value;
//   const pass = evt.currentTarget.elements.pass.value;

//   login(email, pass);
// };

// // функция callback при нажатии на кнопку register
// function onRegister(evt) {
//   evt.preventDefault();

//   if (evt.currentTarget.elements.password.value !== evt.currentTarget.elements.repeatpass.value) {
//     alert('пароли не равны');                 /* заменить на нотификашку*/
//   } else {
//     registration(evt.currentTarget.elements.email.value, evt.currentTarget.elements.password.value, evt.currentTarget.elements.username.value);
//     alert('Ві успешно зарегистрированы');                       /* заменить на нотификашку*/
//     console.log(evt.currentTarget.elements.username.value);
//     // refs.formReg.reset();                   /*нужно скрыть форму с экрана пользователя */
//   };
// };

// // Firebase
// // --------------------------------------------------------
// // регистрация/аутентификация пользователя
// // функция регистрации нового пользователя в firebase
// async function registration(email, password, userName) {
//   try {
//     const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
//     // console.log(data.user.uid);
//     alert(`Вы успешно прошли регистрацию. Добро пожаловать ${data.user.email}`);   /* заменить на нотификашку, добавить опознавательные знаки пребывания пользователя в системе*/
//     identif = true;
//     // проверить local-storage есть ли там что-то, если есть вытащить и записать в базу
//     const currentUser = {
//       name: userName,
//       watched: [''],
//       queue: [''],
//     }
//     newUser(data.user.uid, currentUser);            /*вызов функции записи нового пользователя в базу данных firebase*/
//   } catch (error) {
//     console.log(error.message);
//     alert(`${error.message}`);         /* заменить на нотификашку*/
//     throw error
//   };
// };
// // registration('ca@gmail.com', '111a11');

// // функция аутентификации зарегистрированного пользователя в firebase
// async function login(email, password) {
//   try {
//     const data = await firebase.auth().signInWithEmailAndPassword(email, password)
//     //  console.log(data.user);
//     alert(`Добро пожаловать ${data.user.email}`);          /* заменить на нотификашку, добавить опознавательные знаки пребывания пользователя в системе*/
//     identif = true;
//     // console.log(identif);
//     //  idCurrentUser =  data.user.email;
//     // if (data.user.uid) {
//     //   console.log('авторизован');   /* заменить на нотификашку*/
//     // };
//   } catch (error) {
//     console.log(error.message);
//     alert(error.message);                  /* заменить на нотификашку*/
//     throw error
//   }
// }
// // login('caribywest@gmail.com', 'qwerty');

// // функция записи нового пользователя в базу данных при регистрации
// async function newUser(userId, newUser) {
//   try {
//     //  const addUser = await firebase.database().ref('users').push(newUser)
//     const addUser = await firebase.database().ref('users/' + userId).set(newUser)
//     //  console.log(addUser)
//   } catch (error) {
//     console.log(error.message)
//     throw error
//   }
// }
// // --------------------------------------------------

// // слушатель firebase
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = {
//       userid: user.uid,
//     }
//     console.log(firebase.auth());
//     // console.log(uid);
//     // const userId = firebase.auth().currentUser.uid;
//     // console.log(userId);
//   } else {
//     // User is signed out
//     // ...
//     console.log('вы не авторизованы');
//   }
// });
// // --------------------------------------------------

// // async function writeInBase(arr, id, onBtn) {
// //   const updateDataLibrary = await firebase.database().ref(`users/${userId}/${onBtn}`).set(arr);
// //   alert('фильм успешно добавлен');
// // };

// async function updateUserLibrary(id, onBtn) {
//   const userId = firebase.auth().currentUser.uid;
//   console.log(identified);
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

//   } catch (error) {
//     console.log(error.message)
//     throw error
//   }
// };

// // btnOut.addEventListener('click', onBtnOut);
// // // функция выхода из системы 
// // function onBtnOut() {
// //   // FirebaseAuth.getInstance().signOut();
// //   //   Intent intent = new Intent(getActivity(), LoginActivity.class);
// //   // intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
// //   // startActivity(intent);
// //   firebase.auth().signOut()
// //     .then(() => {
// //       console.log('Signed Out');
// //       document.body.classList.remove('body-color');
// //     })
// //     .catch(e => {
// //       console.error('Sign Out Error', e);
// //     });
// // };

// export { identif };

