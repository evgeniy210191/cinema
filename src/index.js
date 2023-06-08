import defaultRequest from './api-js/defaltData';
import Card from './api-js/card';
import Pagination from './api-js/pages';
import modal from './api-js/modalHome';
export default class Films {
  constructor() {
    this.components = {};
    this.result = {};
    this.initComponents(1);
    this.render();
    modal.eventListeners();
    this.initFetchSubmit(1);
  }

  async initFetchSubmit(page) {
    const searchForm = document.querySelector('.search');
    searchForm.addEventListener('submit', async event => {
      event.preventDefault();
      defaultRequest.query = event.target.elements.search.value.trim();
      this.initComponents(page);
    });
  }

  async initFetch(page) {
    const result = await defaultRequest.getData(page);
    this.result = result;
    const { total_pages } = result;
    this.totalPages = total_pages;
    return result;
  }

  getTemplate() {
    return `<section class="cards">
    <div class="container">
      <div class="list-films cards-js"></div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="pagination">
        <h2 class="hiden">pagination</h2>
      </div>
    </div>
  </section>`;
  }

  render() {
    const main = document.querySelector('main');
    main.innerHTML = this.getTemplate();
    this.element = main;
  }

  async initComponents(page) {
    const resolv = await this.initFetch(page);
    if (!resolv.results.length) {
      const main = document.querySelector('main');
      main.innerHTML = '<h2 class="not_found">Не знайдено</h2>';
      return;
    }
    const card = new Card(resolv.results);
    const pagination = new Pagination(resolv);

    this.components.card = card;
    this.components.pagination = pagination;

    this.renderComponentsPage();
    this.renderComponentsCard();
    this.dispatchEvent();
  }

  renderComponentsPage() {
    const pageList = document.querySelector('.pagination');
    pageList.innerHTML = '';
    pageList.append(...this.components.pagination.element.children);
  }

  renderComponentsCard() {
    const cardList = document.querySelector('.cards-js');
    cardList.innerHTML = '';
    cardList.append(...this.components.card.element.children);
  }

  upDataPage(pageIndex) {
    const pagination = new Pagination({
      total_pages: this.totalPages,
      page: pageIndex,
      piece: 3,
    });

    this.components.pagination = pagination;

    this.renderComponentsPage();
  }

  async upData(page) {
    const resolv = await this.initFetch(page);
    const card = new Card(resolv.results);
    this.components.card = card;
    this.renderComponentsCard();
  }

  dispatchEvent() {
    this.components.pagination.element.addEventListener(
      'page-change',
      event => {
        const pageIndex = Number(event.detail);
        this.upData(pageIndex);
        this.upDataPage(pageIndex);
        this.dispatchEvent();
      }
    );
  }
}
