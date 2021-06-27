import { refs } from './variables.js'
const API_KEY = 'f4d5ed62044715aa9c5e4de0663d29b2';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.filmId = '520783';
  }

  // Поиск по запросу - возвращает массив объектов (фильмов по запросу)
  fetchQueryFilms(page = 1) {
    this.page =page
    return fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`,
    ).then(response => response.json())
      .then((res) => {
        return res;
      }).catch(console.log)
      
  }

  //  Тренды за день - возвращает массив объектов
  fetchTrendsFilms() {
    return fetch(
      `${BASE_URL}trending/all/day?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false`,
    )
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.page += 1;
        return results;
      });
  }

  //Описание фильма - возвращает обект
  fetchInformationAboutFilm(id = '520783') {
    this.filmId = id;
    return fetch(
      `${BASE_URL}movie/${this.filmId}?api_key=${API_KEY}&language=en-US&include_adult=false&append_to_response=videos,images`,
    )
      .then(response => {
        return response.json();
      })
      .then(info => {
        return info;
      });
  }

  // Возвращает массив фильмов по популярности, где 1й элемент - с самой большой популярностью
  filmPopular(page = 1) {
    this.page = page;
    return fetch(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`,
      )
      .then(response => {
        return response.json();
      })
}

async searchGenres(res) {
  return await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
   .then((r)=>r.json())
   .then((r)=>r.genres);
}

// Возвращает url видео по айдишнику фильма
fetchVideoOfFilm() {
  return fetch(
    `${BASE_URL}movie/${this.filmId}/videos?api_key=${API_KEY}&language=en-US`,
  )
    .then(({ url }) => {
      console.log(url);
      return url;
    });
}


  // сбрасывает значение страниц запроса на первую
  resetPage() {
    this.page = 1;
  }

  //   геттер значения запроса => из инпута
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  // Геттер и сеттер Id фильма => сделать запрос на инфу о нем
  get movieId() {
    return this.filmId;
  }

  set movieId(newId) {
    this.filmId = newId;
  }
}

// картинка - poster_path
// добавить в шаблон для каждого id - чтоб открыть карточку (вызвать функцию, которая отправляет запрос апи на инфу)
// название фильма - title
// описание - overview
// дата релиза - release_date - в таком формате: "2021-06-18" (можно формат сократить)
// рейтинг - vote_average
