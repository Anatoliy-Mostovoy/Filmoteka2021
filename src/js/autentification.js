import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

import { refs } from "./variables"
import { database, readUserLibrary } from './fb'

import { openLogIn } from './log-in';
import {checkingTheOpeningCondition, closeToAnnoyment} from './annoyment';

let identif = false;
const { formSignup, formSigning, backdropLogIn, userButton, userNameLogin, signOut } = refs;

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
  // clearTimeout(timerCloseModal);
  closeToAnnoyment();
};

// функция callback при нажатии на кнопку register
function onRegister(evt) {
  evt.preventDefault();

  if (evt.currentTarget.elements.password.value !== evt.currentTarget.elements.repeatpass.value) {
    alert('пароли не равны');                 /* заменить на нотификашку*/
  } else {
    registration(evt.currentTarget.elements.email.value, evt.currentTarget.elements.password.value, evt.currentTarget.elements.username.value);
    closeToAnnoyment();
  };
};

// функция регистрации нового пользователя в firebase
async function registration(email, password, userName) {
  try {
    const data = await firebase.auth().createUserWithEmailAndPassword(email, password);

    alert(`Вы успешно прошли регистрацию. Добро пожаловать ${data.user.email}, ${userName}`);   /* заменить на нотификашку, добавить опознавательные знаки пребывания пользователя в системе*/
    // identif = true;
    // проверить local-storage есть ли там что-то, если есть вытащить и записать в базу
    const currentUser = {
      name: userName,
      watched: [''],
      queue: [''],
    }
    newUser(data.user.uid, currentUser);            /*вызов функции записи нового пользователя в базу данных firebase*/
    // signInUser();
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
    alert(`Добро пожаловать ${data.user.uid}`);          /* заменить на нотификашку, добавить опознавательные знаки пребывания пользователя в системе*/
    // identif = true;
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

export function signInUser() {
  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      identif = true;
      const queryDataLibrary = await readUserLibrary();
      const userName = queryDataLibrary.val().name;

      backdropLogIn.classList.add('backdrop-hidden');
      userButton.classList.add('js-reserved-name');
      userNameLogin.textContent = userName;

      signOut.addEventListener('click', signOutUser);
      userButton.removeEventListener('click', openLogIn);
      console.log('ЗАРЕГИСТРИРОВАН из вторизации', firebase.auth().currentUser.uid);
      return;
    } else {
      identif = false;
      signOut.removeEventListener('click', signOutUser);
      userButton.addEventListener('click', openLogIn);
      console.log('НЕ ЗАРЕГИСТРИРОВАН signInUser');
      checkingTheOpeningCondition()
      return;
    }
  })
};

// // функция выхода из системы 
function signOutUser() {
  firebase.auth().signOut()
  .then(() => {
    userButton.classList.remove('js-reserved-name');
    userNameLogin.textContent = 'Guest User';
    console.log('Signed Out');
  })
.catch(e=>{
 console.error('Sign Out Error', e);
});
};

// --------------------------------------------------
export { identif };