import SearchData from './api-js/fethcApi';
import Pagination from './api-js/pages';
import GetDefaultData from './api-js/defaltData';
const [search, form, paginationList, prev, next] = [
  '.search-svg',
  'form',
  '.pageList',
  '.prev',
  '.next',
].map(item => document.querySelector(item));

const getDefaultData = new GetDefaultData();

async function showDefaultData() {
  const result = await getDefaultData.getData();
  const pagination = new Pagination(result);
  const addPage = pagination.renderPages();
  paginationList.innerHTML = addPage;
  console.log(result);
  pagination.decriment();
  console.log(result.page);
}

window.addEventListener('loader', showDefaultData(), { once: true });

async function decrimentPage() {
  pagination.decriment();
  const result = await getDefaultData.getData();
  const pagination = new Pagination(result);
  const addPage = pagination.renderPages();
  paginationList.insertAdjacentHTML('afterBegin', addPage);
  console.log(result);
}

form.addEventListener('submit', getData);

async function getData(e) {
  e.preventDefault();
  console.dir(e.target.elements.search.value);
  fetchApi.query = e.target.elements.search.value;
  console.log(await fetchApi.getData());
}

next.addEventListener('click', decrimentPage);
