import aboutFilmFetch from './aboutFilmFetch';
const listFilm = document.querySelector('.cards-js');
export default modalLibrary = {
  body: document.querySelector('body'),

  eventListeners() {
    document.addEventListener('click', async event => {
      if (event.target.closest('.films')) {
        modalLibrary
          .render(event.target.parentNode.dataset.atrebutInfo)
          .then(() => {
            const deleteButtton = document.getElementById('delete');
            const inputQueue = document.getElementById('check-queue');
            if (inputQueue.checked === true) {
              deleteButtton.disabled = false;
            } else {
              deleteButtton.disabled = true;
            }
          });
      }
      if (
        event.target.closest('.close') ||
        event.target.id === 'backdrop-modals'
      ) {
        this.removeIsOpen();
      }

      if (event.target.id === 'delete') {
        if (localStorage.getItem('idFilmsQueue')) {
          const parsId = JSON.parse(localStorage.getItem('idFilmsQueue'));
          const index = this.indexFilm(event.target.dataset.id, parsId);
          const removedFilm = parsId
            .slice(0, index)
            .concat(parsId.slice(index + 1, parsId.length));
          localStorage.setItem('idFilmsQueue', JSON.stringify(removedFilm));
          this.removeIsOpen();
          console.log(removedFilm);
          this.queue(removedFilm);
        }
      }
    });
  },

  removeIsOpen() {
    if (this.isOpen.classList.contains('is-open')) {
      this.isOpen.classList.remove('is-open');
      this.body.classList.remove('is-hidden');
    }
  },

  indexFilm(ids, arr) {
    return arr.findIndex(item => {
      return item.original_title === ids;
    });
  },

  queue(films) {
    listFilm.innerHTML = films
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
              <p class="second-title">${genres()}| ${item.release_date.slice(
          0,
          4
        )}</p>
            </h2>
          </div>
      `;
      })
      .join('');
  },

  async aboutFilm(idS) {
    const filmInfo = await aboutFilmFetch.getData(idS);
    const {
      poster_path,
      vote_count,
      vote_average,
      original_title,
      popularity,
      overview,
      genres,
    } = filmInfo;
    const genr = () => {
      let genresName = [];
      for (const genr of genres) {
        genresName.push(genr.name);
      }
      return genresName.join(', ');
    };
    return `
    <div class="backdrop" id="backdrop-modals">
    <div class="modal">
      <button tupe="button" class="close">
          <span class="top"></span> 
          <span class="bottom"></span>
      </button>
      <div class="card-film">
        <img class="card-img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}">
        <div class="fistful">
          <h2 class="title-film">${original_title}</h2>
          <div class="rating">
            <div class="firste-title">Vote/Votes
              <p class="detail">
                <span class="vote">${vote_average}</span> /
                <span">${vote_count}</span>
              </p>
            </div>
            <p class="firste-title">Popularity<span class="detail">${popularity}</span></p>
            <p class="firste-title">Original Title<span class="detail">${original_title}</span></p>
            <p class="firste-title">Genre<span class="detail">${genr()}</span></p>
          </div>
          <div class="about-film">
            <h3>Про кіно</h3>
            <p class="about-text">
              ${overview}
            </p>
          </div>
          <div class="add-film">
            <button type="button" class="add-wotched" id="delete" disabled="true" data-id="${original_title}">Remote</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  },
  async render(idS) {
    const myRender = await this.aboutFilm(idS);
    this.body.insertAdjacentHTML('afterbegin', myRender);
    const isOpen = document.getElementById('backdrop-modals');
    this.isOpen = isOpen;
    if (!isOpen.classList.contains('is-open')) {
      isOpen.classList.add('is-open');
      this.body.classList.add('is-hidden');
    }
  },
};
