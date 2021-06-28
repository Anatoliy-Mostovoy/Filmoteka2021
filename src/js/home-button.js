// import { refs } from './variables';
// import filmCards from '../templates/home.hbs';
// import { ApiService } from '../index';
// import {renderMyLibrary} from './local-storage-API';
// import { showSpinner } from './spinner';
// // import pagination1 from './maryska';
// var pagination = require('./maryska');
// console.log('МАРИСЬКИ ПРАЦЮЄ');

// let films = [];
// let GENRES = [];

// function addFilms(arr) {
//   films = [...arr];
// }
// function addGenres(film) {
//   film.genresMy = [
//     ...film.genre_ids.reduce((acc, id) => {
//       const genreName = GENRES.find(genre => genre.id === id);
//       acc.push(genreName);
//       return acc;
//     }, []),
//   ];
// }

// refs.myLibraryButton.addEventListener('click', onMyLibraryButtonClick);
// refs.homeButton.addEventListener('click', onHomeButtonClick);
// refs.logo.addEventListener('click', onHomeButtonClick);

// function onMyLibraryButtonClick(e) {
//   e.preventDefault();
//   showSpinner();
//   //! ТУТ ТРЕБА УЗГОДИТИ!!!!!!
//   // refs.homeButton.addEventListener('click', onHomeButtonClick);
//   // refs.myLibraryButton.removeEventListener('click', onMyLibraryButtonClick);

//   refs.myLibraryButton.classList.add('current');
//   refs.homeButton.classList.remove('current');

//   refs.searchForm.classList.add('header-hidden');
//   refs.buttonBlockHeader.classList.remove('header-hidden');

//   refs.header.classList.add('header-library');

//   refs.nothSearch.classList.add('nothing-search__hidden');

//   renderMyLibrary(e)
// }

// function onHomeButtonClick(e) {
//   showSpinner();
//   //! ТУТ ТРЕБА УЗГОДИТИ!!!!!!
//   // refs.myLibraryButton.addEventListener('click', onMyLibraryButtonClick);
//   // refs.homeButton.removeEventListener('click', onHomeButtonClick);

//   refs.myLibraryButton.classList.remove('current');
//   refs.homeButton.classList.add('current');

//   refs.searchForm.classList.remove('header-hidden');
//   refs.buttonBlockHeader.classList.add('header-hidden');

//   refs.header.classList.remove('header-library');

//   onPopularRender();
// }

// async function searchGenres(response) {

//   return await ApiService.searchGenres(response.results).then(r => {
//     GENRES = r;
//     addFilms(response.results);
//     response.results.forEach(film => {
//         // console.log(film);
//       addGenres(film);
//     });
//     // console.log(films)
//     return response.results;
//   });
// }

// export async function onPopularRender() {

//      try {

//         const res1 = await ApiService.filmPopular();
      
//         makePagin(res1);
//         pag1.onPageChanged(onPopularRenderNext);
      
//         await makeFilmsWithGenres(res1)
//         // console.log(res1)
//         return await res1
//      } catch (error) {
//          console.log(error);
//      } 
// };

//   function render (films) {
//     refs.cardsList.innerHTML = '';
//     refs.cardsList.insertAdjacentHTML('beforeend',filmCards(films))
//     return films;
// };

// export async function makeFilmsWithGenres(response) {
//     try {
//         const res2 = await searchGenres(response);
//         const res4 = await render(films);


//      } catch (error) {
//          console.log(error);
//      } 

// }

// async function onPopularRenderNext(page){
//   try {

//     const res1 = await ApiService.filmPopular(page);

//     await makeFilmsWithGenres(res1)

//    } catch (error) {
//        console.log(error);
//    } 
// }


// //* pagination
// var pag1;


// function makePagin(respons) {

//      pag1 = new pagination(document.getElementsByClassName('pagination')[0],
//   {
//       currentPage: 1,		// number
//       totalItems: respons.total_results,       // number
//       itemsPerPage: 20,    // number
//       stepNum: 1,			// number
//     //   onInit: onPopularRenderNext	        // function
//   });


//   return respons;

// }

// ---------КОД ЮЛЯ
import { refs } from './variables';
import filmCards from '../templates/home.hbs';
import { ApiService } from '../index';
// import {renderMyLibrary} from './local-storage-API';
import { renderLibrary } from './fb'

import { showSpinner } from './spinner';
import { checkIfEmptyLibrary } from './header-observer';
var pagination = require('./maryska');
console.log('МАРИСЬКИ ПРАЦЮЄ');

let films = [];
let GENRES = [];

function addFilms(arr) {
  films = [...arr];
}
function addGenres(film) {
  film.genresMy = [
    ...film.genre_ids.reduce((acc, id) => {
      const genreName = GENRES.find(genre => genre.id === id);
      acc.push(genreName);
      return acc;
    }, []),
  ];
}

refs.myLibraryButton.addEventListener('click', onMyLibraryButtonClick);
refs.homeButton.addEventListener('click', onHomeButtonClick);
refs.logo.addEventListener('click', onHomeButtonClick);

function onMyLibraryButtonClick(e) {
  // checkIfEmptyLibrary();
  e.preventDefault();
  showSpinner();

  refs.myLibraryButton.classList.add('current');
  refs.homeButton.classList.remove('current');

  refs.searchForm.classList.add('header-hidden');
  refs.buttonBlockHeader.classList.remove('header-hidden');

  refs.header.classList.add('header-library');

  refs.nothSearch.classList.add('nothing-search__hidden');

  // renderMyLibrary(e)
  renderLibrary();


  refs.cardsList.setAttribute('data-list', 'library');

}

function onHomeButtonClick(e) {
  showSpinner();
  //! ТУТ ТРЕБА УЗГОДИТИ!!!!!!
  // refs.myLibraryButton.addEventListener('click', onMyLibraryButtonClick);
  // refs.homeButton.removeEventListener('click', onHomeButtonClick);

  refs.myLibraryButton.classList.remove('current');
  refs.homeButton.classList.add('current');

  refs.searchForm.classList.remove('header-hidden');
  refs.buttonBlockHeader.classList.add('header-hidden');

  refs.header.classList.remove('header-library');

  onPopularRender();
}

async function searchGenres(response) {
  return await ApiService.searchGenres(response.results).then(r => {
    GENRES = r;
    addFilms(response.results);
    response.results.forEach(film => {
      // console.log(film);
      addGenres(film);
    });
    refs.cardsList.setAttribute('data-list', 'home');
    return response.results;
  });
}

export async function onPopularRender() {
  try {
    const res1 = await ApiService.filmPopular();

    makePagin(res1);
    pag1.onPageChanged(onPopularRenderNext);

    await makeFilmsWithGenres(res1);
    // console.log(res1)
    return await res1;
  } catch (error) {
    console.log(error);
  }
}

function render(films) {
  refs.cardsList.innerHTML = '';
  refs.cardsList.insertAdjacentHTML('beforeend', filmCards(films));
  return films;
}

export async function makeFilmsWithGenres(response) {
  try {
    const res2 = await searchGenres(response);
    const res4 = await render(films);
  } catch (error) {
    console.log(error);
  }
}

async function onPopularRenderNext(page) {
  try {
    const res1 = await ApiService.filmPopular(page);

    await makeFilmsWithGenres(res1);
  } catch (error) {
    console.log(error);
  }
}

//* pagination
var pag1;

function makePagin(respons) {
  pag1 = new pagination(document.getElementsByClassName('pagination')[0], {
    currentPage: 1, // number
    totalItems: respons.total_results, // number
    itemsPerPage: 20, // number
    stepNum: 1, // number
    //   onInit: onPopularRenderNext	        // function
  });

  return respons;
}
