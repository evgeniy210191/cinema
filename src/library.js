import modalLibrary from './api-js/modalLibrary';

export default class Library {
  listFilmLibrary = document.querySelector('.cards');
  paginationList = document.querySelector('.pagination');
  constructor() {
    this.components = {};
    this.eventListeners();
  }

  eventListeners() {
    modalLibrary.eventListeners();
    if (
      localStorage.getItem('idFilmsWatched') &&
      JSON.parse(localStorage.getItem('idFilmsWatched')).length !== 0
    ) {
      const parsId = JSON.parse(localStorage.getItem('idFilmsWatched'));
      this.render(parsId);
    } else {
      this.listFilmLibrary.innerHTML = '<h2 class="not_found">Не знайдено</h2>';
    }
    document.addEventListener('click', async event => {
      if (event.target.closest('.watched')) {
        if (
          localStorage.getItem('idFilmsWatched') &&
          JSON.parse(localStorage.getItem('idFilmsWatched')).length !== 0
        ) {
          const parsId = JSON.parse(localStorage.getItem('idFilmsWatched'));

          this.render(parsId);
        } else {
          this.listFilmLibrary.innerHTML =
            '<h2 class="not_found">Не знайдено</h2>';
        }
      }
      if (event.target.closest('.queue')) {
        if (
          localStorage.getItem('idFilmsQueue') &&
          JSON.parse(localStorage.getItem('idFilmsQueue')).length !== 0
        ) {
          const parsId = JSON.parse(localStorage.getItem('idFilmsQueue'));
          console.dir(parsId.length);
          this.render(parsId);
        } else {
          this.listFilmLibrary.innerHTML =
            '<h2 class="not_found">Не знайдено</h2>';
        }
      }
    });
  }

  render(films) {
    const pageOfFilms = document.querySelector('.cards-js');
    pageOfFilms.innerHTML = this.signboard(films);
  }

  signboard(films) {
    return films
      .map(item => {
        const genres = () => {
          let genresName = [];
          for (const genr of item.genres) {
            genresName.push(genr.name);
          }
          return genresName.join(', ');
        };
        return `
        <div class="films" data-atrebut-info="${item.id}">
            <img src="https://image.tmdb.org/t/p/w500${
              item.poster_path
            }" alt="${item.original_title}">
            <h2>${item.original_title}<br>
              <p class="second-title">${genres()} | ${item.release_date.slice(
          0,
          4
        )}</p>
            </h2>
          </div>
      `;
      })
      .join('');
  }
}
