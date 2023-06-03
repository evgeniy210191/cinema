export default class Pagination {
  constructor({ total_pages, page = 1, piece = 3 } = {}) {
    this.totalPages = total_pages;
    this.piece = piece;

    this.page = page;
    this.key = 'ef54c316f166b2a5913791e8b3f63a4a';
    this.renderPages();
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

  initPages() {
    return new Array(this.quantityPages())
      .fill(0)
      .map((item, index) => {
        return this.pages(index + 1);
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
  setPage(page = 1) {
    const isActive = this.element.querySelector('.page.active');
    if (isActive) {
      isActive.classList.remove('active');
    }
    const pageItem = this.element.querySelector(`[data-page-index="${page}"]`);
    pageItem.classList.add('active');
    this.dispatchEvent(page);
    this.page = page;
  }
  nextPage() {
    if (this.page > this.totalPages - 1) return;
    if (this.page > this.piece - 1) {
      this.renderUpPagesNext();
    }
    this.page += 1;
    this.setPage(this.page);
  }
  prevPage() {
    if (this.page === 1) return;
    if (this.page > this.piece - 1) {
      this.renderUpPagesPrev();
    }
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
    this.element.dispatchEvent(customEvent);
  }

  upDataNext() {
    return new Array(this.quantityPages())
      .fill(0)
      .map((item, index) => {
        return this.pages(index + this.page - 1);
      })
      .join('');
  }
  upListPageNext() {
    return `
      ${this.upDataNext()}
    `;
  }

  renderUpPagesNext() {
    const pagination = document.querySelector('.page-list');
    pagination.innerHTML = this.upListPageNext();
    this.element = pagination.parentNode;
  }

  upDataPrev() {
    return new Array(this.quantityPages())
      .fill(0)
      .map((item, index) => {
        return this.pages(index + this.page - 2);
      })
      .join('');
  }
  upListPagePrev() {
    return `
      ${this.upDataPrev()}
    `;
  }

  renderUpPagesPrev() {
    const pagination = document.querySelector('.page-list');
    pagination.innerHTML = this.upListPagePrev();
    this.element = pagination.parentNode;
  }
}
