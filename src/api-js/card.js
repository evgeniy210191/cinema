export default class Card {
  constructor(someFilm = []) {
    this.state = someFilm;
    this.myRender();
  }
  renderCard() {
    return this.state
      .map(item => {
        return ` 
          <div class="films" data-atrebut-info="${item.id}">
            <img src="https://image.tmdb.org/t/p/w500${
              item.poster_path
            }" alt="${item.title}">
            <h2>${item.title}<br>
              <p>| ${item.release_date.slice(0, 4)}</p>
            </h2>
          </div>
        
    `;
      })
      .join('');
  }
  myRender() {
    const cards = document.querySelector('.cards-js');
    const myRender = this.renderCard();

    cards.innerHTML = myRender;
    this.element = cards;
  }
}
