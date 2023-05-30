export default class Pagination {
  constructor({ total_pages = 10, page = 0 } = {}) {
    this.totalPages = total_pages;
    this.page = page;
    this.key = 'ef54c316f166b2a5913791e8b3f63a4a';
    this.renderPages();
    this.addEventListeners();
  }

  quantityPages() {
    const counterPages = this.totalPages !== 0 ? this.totalPages : 0;
    return counterPages;
  }

  pages(index) {
    const isActive = this.page === index ? 'active' : '';
    return `
      <li class="page ${isActive}" data-page-index="${index}">${index + 1}</li>
    `;
  }

  initPages() {
    return new Array(this.quantityPages())
      .fill(0)
      .map((item, index) => {
        return this.pages(index);
      })
      .join('');
  }

  getTempLate() {
    return `
      ${this.initPages()}
    `;
  }
  renderPages() {
    const pagination = document.querySelector('.page-list');
    pagination.innerHTML = this.getTempLate();
    this.element = pagination.parentNode;
  }
  setPage(page = 0) {
    if (page < 0 || page > this.totalPages - 1) return;
    const isActive = this.element.querySelector('.page.active');
    if (isActive) {
      isActive.classList.remove('active');
    }
    const pageItem = this.element.querySelector(`[data-page-index="${page}"]`);
    pageItem.classList.add('active');

    this.page = page;
    console.log(page);
  }
  nextPage() {
    this.page += 1;
    this.setPage(this.page);
  }
  prevPage() {
    this.page -= 1;
    this.setPage(this.page);
  }

  addEventListeners() {
    const [prev, next, list] = [
      '[data-element="prev"]',
      '[data-element="next"]',
      '.page-list',
    ].map(item => {
      return this.element.querySelector(item);
    });
    prev.addEventListener('click', event => {
      this.prevPage();
    });
    next.addEventListener('click', event => {
      this.nextPage();
    });
    list.addEventListener('click', event => {
      const pageItem = event.target.closest('.page');
      if (!pageItem) return;
      const pageindex = pageItem.dataset.pageIndex;
      this.setPage(Number(pageindex));
    });
  }
}
