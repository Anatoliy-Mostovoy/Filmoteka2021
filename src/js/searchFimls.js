// import debounce from 'lodash/debounce';
import FilmsApiService from './api-content.js';
// import filmTpl from '../templates/home.hbs';
// import maktup from '../templates/maktup.hbs';
import { refs } from './variables.js';
import { showSpinner } from './spinner';
import {makeFilmsWithGenres} from './home-button';
var pagination = require('./maryska');
const newFilmsApi = new FilmsApiService();
const inputRef = document.querySelector('.header-form');

inputRef.addEventListener('submit', onSearch);

// Тестовая функция - по сабмиту формы вызывает функции фетча
function onSearch(evt) {
  evt.preventDefault();
  showSpinner();
  const query = evt.currentTarget.elements[0].value;


  // записывает значение инпута в api
  newFilmsApi.searchQuery = query;

  // сбрасывает счетчик страниц запроса
  // newFilmsApi.resetPage();

  //возвращвет объект фильма по id
  // Для запроса информации о фильме => записать id текущего фильма в newFilmsApi.filmId
  // по умолчанию функция вернет => "Леди Баг и Супер Кот"
  // newFilmsApi.fetchInformationAboutFilm();

  // возвращает массив фильмов по запросу
  newFilmsApi.fetchQueryFilms().then(renderCard).catch(err);
  // возвращает массив трендовых видосов
  // newFilmsApi.fetchTrendsFilms();
}

function renderCard(data) {

  if (!data.results[0]) {
    throw new Error('not Exist');
  } else {
    refs.nothSearch.classList.add('nothing-search__hidden');


    makeFilmsWithGenres(data)
    makePagin(data);
    pag2.onPageChanged(nextSearchPage);

  }
}

function err() {
  refs.nothSearch.classList.remove('nothing-search__hidden');
  refs.cardsList.innerHTML = '';
}

//? неробочий update пошуку фільмів

// refs.searchInput.addEventListener('input', debounce(indentifyValue, 700));

// function indentifyValue(ev) {
//   const textOfInput = ev.target.value.trim();
//   if (textOfInput.length < 1) {
//     return alert('Nothing matches to search');
//   }
//   return newFilmsApi.fetchQueryFilms(textOfInput).then(textOfInput =>
//     textOfInput.length <= 10 && textOfInput.length >= 2
//       ? createMaktup(textOfInput)
//       : textOfInput.length === 1
//         ? renderCard(textOfInput)
//         : alert('Too many matches found. Please enter a more specific query'),
//   );
// }

// function createMaktup(mak) {
//   refs.cardsList.innerHTML = maktup(mak)
// }



//* pagination
var pag2;

function makePagin(respons) {

     pag2 = new pagination(document.getElementsByClassName('pagination')[0],
  {
      currentPage: 1,		// number
      totalItems: respons.total_results,       // number
      itemsPerPage: 20,    // number
      stepNum: 2,			// number
    //   onInit: onPopularRenderNext	        // function
  });
  return respons;
}

async function nextSearchPage(page) {
  
  try {
    const response = await newFilmsApi.fetchQueryFilms(page)
    await makeFilmsWithGenres(response)
  } catch (error) {
    console.log(error);
  }
}

