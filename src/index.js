import defaultRequest from './api-js/defaltData';
import searchData from './api-js/fethcApi';
import Card from './api-js/card';
import Pagination from './api-js/pages';
import modal from './api-js/modalHome';
export default class Films {
  constructor() {
    this.components = {};
    this.initComponents();

    modal.eventListeners();
  }
  async initDefaultFetch(page) {
    const result = await defaultRequest.getData(page);
    const card = new Card(result.results);
    this.components.card = card;
    const pagination = new Pagination(result);
    this.components.pagination = pagination;
    this.renderComponentsCard();
    console.log('here');
    this.renderComponentsPage();
    this.result = result;
    return result;
  }
  async initComponents() {
    console.log('sory');
    const result = await this.initDefaultFetch();
    this.eventListeners();
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

  eventListeners() {
    this.components.pagination.element.addEventListener(
      'page-change',
      event => {
        const pageIndex = Number(event.detail);

        this.initDefaultFetch(pageIndex);
      }
    );
  }
}
