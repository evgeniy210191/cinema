export default class Pagination {
  constructor({ total_pages, page = 1, piece = 3 } = {}) {
    this.totalPages = total_pages;
    this.piece = piece;
    this.page = page;
    this.key = 'ef54c316f166b2a5913791e8b3f63a4a';
    this.renderPages(this.page);
    this.addEventListeners();
  }

  quantityPages() {
    const counterPages =
      this.totalPages === 0
        ? 0
        : this.totalPages < this.piece
        ? this.totalPages
        : this.piece;
    return counterPages;
  }

  pages(index) {
    const isActive = this.page === index ? 'active' : '';
    return `
      <li class="page ${isActive}" data-page-index="${index}">${index}</li>
    `;
  }

  initPages(upPage) {
    return new Array(this.quantityPages())
      .fill(0)
      .map((item, index) => {
        return this.pages(index + upPage);
      })
      .join('');
  }

  getTempLate(upPage) {
    return `
      <div class="paginationList">
      <button type="button" data-element="prev" class="prev"></button>
      <ul class="page-list">
        ${this.initPages(upPage)}
      </ul>
      <button type="button" data-element="next" class="next"></button>
      </div>
    `;
  }

  renderPages(upPage) {
    const pagination = document.createElement('div');
    if (upPage > 1 && upPage < this.totalPages) {
      pagination.innerHTML = this.getTempLate(upPage - 1);
      this.element = pagination.firstElementChild;
      return;
    } else {
      pagination.innerHTML = this.getTempLate(upPage);
      this.element = pagination.firstElementChild;
    }
  }

  setPage(page = 1) {
    const isActive = document.querySelector('.page.active');
    if (isActive) {
      isActive.classList.remove('active');
    }

    const pageItem = document.querySelector(`[data-page-index="${page}"]`);
    pageItem.classList.add('active');
    this.dispatchEvent(page);
    this.page = page;
  }

  nextPage() {
    if (this.page > this.totalPages - 1) return;
    this.page += 1;
    this.setPage(this.page);
  }

  prevPage() {
    if (this.page === 1) return;
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
    prev.addEventListener('click', () => {
      this.prevPage();
    });
    next.addEventListener('click', () => {
      this.nextPage();
    });
    list.addEventListener('click', event => {
      const pageItem = event.target.closest('.page');
      const pageItemActive = event.target.closest('.page.active');
      if (!pageItem) return;
      if (pageItemActive) return;
      const pageindex = pageItem.dataset.pageIndex;
      this.setPage(Number(pageindex));
    });
  }

  dispatchEvent(pageIndex) {
    const customEvent = new CustomEvent('page-change', {
      detail: pageIndex,
    });
    const header = document.querySelector('header');
    window.scrollTo({
      top: header.getBoundingClientRect().height,
      behavior: 'smooth',
    });
    this.page = customEvent;
    this.element.dispatchEvent(customEvent);
  }
}
