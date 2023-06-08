import aboutFilmFetch from './aboutFilmFetch';
export default modal = {
  body: document.querySelector('body'),

  eventListeners() {
    document.addEventListener('click', async event => {
      if (event.target.closest('.films')) {
        modal.render(event.target.parentNode.dataset.atrebutInfo);
      }
      if (
        event.target.closest('.close') ||
        event.target.id === 'backdrop-modals'
      ) {
        if (this.isOpen.classList.contains('is-open')) {
          this.isOpen.classList.remove('is-open');
          this.body.classList.remove('is-hidden');
        }
      }
      this.addLocalStorage();
    });
  },

  async addLocalStorage() {
    if (event.target.id === 'watched') {
      const filmInfo = await aboutFilmFetch.getData(event.target.dataset.id);
      const idFilms = localStorage.getItem('idFilmsWatched');
      if (idFilms) {
        const parsId = JSON.parse(idFilms);
        const similarId = this.similarId(parsId);
        if (similarId === -1) {
          parsId.push(filmInfo);
          localStorage.setItem('idFilmsWatched', JSON.stringify(parsId));
        }
        return;
      }
      localStorage.setItem('idFilmsWatched', JSON.stringify([filmInfo]));
    }

    if (event.target.id === 'queue') {
      const filmInfo = await aboutFilmFetch.getData(event.target.dataset.id);
      const idFilms = localStorage.getItem('idFilmsQueue');
      if (idFilms) {
        const parsId = JSON.parse(idFilms);
        const similarId = this.similarId(parsId);
        if (similarId === -1) {
          parsId.push(filmInfo);
          localStorage.setItem('idFilmsQueue', JSON.stringify(parsId));
        }
        return;
      }
      localStorage.setItem('idFilmsQueue', JSON.stringify([filmInfo]));
    }
  },

  similarId(arr) {
    return arr.findIndex(item => {
      return item.id === this.id;
    });
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
      id,
    } = filmInfo;
    this.id = id;
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
            <button type="button" class="add-watched" id="watched" data-id="${id}">add to Watched</button>
            <button type="button" class="add-queue" id="queue" data-id="${id}">add to queue</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  },
  async render(idS) {
    const myRender = await modal.aboutFilm(idS);
    this.body.insertAdjacentHTML('afterbegin', myRender);
    const isOpen = document.getElementById('backdrop-modals');
    this.isOpen = isOpen;
    if (!isOpen.classList.contains('is-open')) {
      isOpen.classList.add('is-open');
      this.body.classList.add('is-hidden');
    }
  },
};
