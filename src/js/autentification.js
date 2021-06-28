import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

import { refs } from "./variables"

// import { database } from './fb'

let identif = false;
const { formSignup, formSigning, backdropLogIn } = refs;

// const resetPass = document.querySelector('.js-forgot-pass');

formSigning.addEventListener('submit', onLogin);
formSignup.addEventListener('submit', onRegister);

// ------------------------------------
// функция callback при нажатии на кнопку login
function onLogin(evt) {
  evt.preventDefault();

  const email = evt.currentTarget.elements.email.value;
  const pass = evt.currentTarget.elements.pass.value;

  login(email, pass);
};

// функция callback при нажатии на кнопку register
function onRegister(evt) {
  evt.preventDefault();

  if (evt.currentTarget.elements.password.value !== evt.currentTarget.elements.repeatpass.value) {
    alert('пароли не равны');                 /* заменить на нотификашку*/
  } else {
    registration(evt.currentTarget.elements.email.value, evt.currentTarget.elements.password.value, evt.currentTarget.elements.username.value);
    console.log(evt.currentTarget.elements.username.value);
  };
};

//  Firebase
// --------------------------------------------------------
// регистрация/аутентификация пользователя
// функция регистрации нового пользователя в firebase
async function registration(email, password, userName) {
  try {
    const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
    // console.log(data.user.uid);
    
    alert(`Вы успешно прошли регистрацию. Добро пожаловать ${data.user.email}, ${userName}`);   /* заменить на нотификашку, добавить опознавательные знаки пребывания пользователя в системе*/
    identif = true;
    backdropLogIn.classList.add('backdrop-hidden');

    // проверить local-storage есть ли там что-то, если есть вытащить и записать в базу
    const currentUser = {
      name: userName,
      watched: [''],
      queue: [''],
    }
    newUser(data.user.uid, currentUser);            /*вызов функции записи нового пользователя в базу данных firebase*/
  } catch (error) {
    // console.log(error.message);
    alert(`${error.message}`);         /* заменить на нотификашку*/
    throw error
  };
};

// функция аутентификации зарегистрированного пользователя в firebase
async function login(email, password) {
  try {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password)
    // console.log(data.user);
    alert(`Добро пожаловать ${data.user.email}`);          /* заменить на нотификашку, добавить опознавательные знаки пребывания пользователя в системе*/
    identif = true;
    backdropLogIn.classList.add('backdrop-hidden');
  } catch (error) {
    // console.log(error.message);
    alert(error.message);                  /* заменить на нотификашку*/
    throw error
  }
}

// функция записи нового пользователя в базу данных при регистрации
async function newUser(userId, newUser) {
  try {
    const addUser = await database.ref('users/' + userId).set(newUser)
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
// // --------------------------------------------------
export { identif };