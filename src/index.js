import SearchData from './api-js/fethcApi';
import Pagination from './api-js/pages';
import GetDefaultData from './api-js/defaltData';
import Card from './api-js/card';
export default class Films {
  constructor() {
    this.result = {};
    this.components = {};
    this.page = 1;
    this.update();
    this.showDefaultData();
  }

  async loadDefaultData() {
    const getDefaultData = new GetDefaultData(this.page);
    const result = await getDefaultData.getData();
    console.log(result);
    return result;
  }
  showDefaultData() {
    const card = new Card(this.result.results);
    const pagination = new Pagination(this.result);
    this.components.card = card;
    this.components.pagination = pagination;
  }

  async update() {
    const data = await this.loadDefaultData();
    this.components.card.indexHTML = data;
  }
  async getData(e) {
    e.preventDefault();
    console.dir(e.target.elements.search.value);
    fetchApi.query = e.target.elements.search.value;
    console.log(await fetchApi.getData());
  }
}
