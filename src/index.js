import './sass/main.scss';

import { refs } from './js/variables.js';
import FilmsApiService from './js/api-content';
// import filmCard from './templates/home.hbs';
import './js/treyler';
import './js/searchFimls'

import './js/filmModal';
//* імпортую пвгінацію
// import './js/paginationButtons';
import './js/home-button';
import './js/annoyment';
import './js/header-observer';
import { onPopularRender } from './js/home-button';
import '/js/local-storage-API';
import './js/spinner';
import './js/log-in';
import PaginationMyLibrary from './js/pagination-for-my-library';

export const ApiService = new FilmsApiService();
export const paginationMyLibrary = new PaginationMyLibrary();


// import './js/fb';
// import './js/autentification'
// console.log(ApiService.filmPopular);
// export default ApiService.filmPopular
onPopularRender();
// import './js/pagination-for-my-library';



// ApiService.filmPopular().then(console.log)
// newFilmsApi.fetchInformationAboutFilm().then(console.log)
