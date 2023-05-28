export default class Card {
  constructor(someFilm = {}) {
    this.state = someFilm;
  }
  renderCard() {
    return `
        <div class="list-films">
          <div class="films">
            <img src="${this.state.poster_path}" alt="${title}">
            <h2>${title}<br>
              <p>| ${this.state.release_date.slice(0, 4)}</p>
            </h2>
          </div>
        </div>
    `;
  }
}
