import defaultRequest from './api-js/defaltData';
import searchData from './api-js/fethcApi';
import Pagination from './api-js/pages';
import Card from './api-js/card';
import modal from './api-js/modal';
export default class Films {
  constructor() {
    this.components = {};
    this.result = {};
    this.initDefaultFetch();
    this.initComponents();
    this.dispathEventDefaultFetch();
    this.serchFilms();
    modal.eventListeners();
  }
  async initDefaultFetch(page) {
    const result = await defaultRequest.getData(page);
    const card = new Card(result.results);
    return result;
  }
  initComponents() {
    const pagination = new Pagination(this.result);
    this.components.pagination = pagination;
  }

  dispathEventDefaultFetch() {
    this.components.pagination.element.addEventListener('page-change', evt => {
      const pageIndex = Number(evt.detail);
      this.initDefaultFetch(pageIndex);
    });
  }

  serchFilms() {
    const form = document.querySelector('.search');
    form.addEventListener('submit', event => {
      event.preventDefault();
      searchData.query = event.target.elements.search.value;
      this.initShowData();
      this.dispatchEventSearchFilms();
    });
  }

  async initShowData(page) {
    try {
      const result = await searchData.getData(page);
      const card = new Card(result.results);
      this.components.card = card;
      return result;
    } catch (error) {
      const errorText = `<div class="container"
        style="font-size:32px;
        color:red">sory, no info</div>`;
      document.querySelector('.cards-js').innerHTML = errorText;
    }
  }
  dispatchEventSearchFilms() {
    this.components.pagination.element.addEventListener('page-change', evt => {
      const pageIndex = Number(evt.detail);
      this.initShowData(pageIndex);
    });
  }
}
