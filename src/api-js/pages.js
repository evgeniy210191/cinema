export default class Pagination {
  constructor(totalPages = {}) {
    this.totalPages = totalPages;
    this.key = 'ef54c316f166b2a5913791e8b3f63a4a';
  }

  quantityPages() {
    const pages =
      this.totalPages.total_pages !== 0 ? this.totalPages.total_pages : 0;
    return pages;
  }
  renderPages() {
    return new Array(this.quantityPages())
      .fill(0)
      .map((item, index) => {
        return this.page(index + 1);
      })
      .join('');
  }

  page(index) {
    const isActive = this.totalPages.page === index ? 'page active' : 'page';
    return `
      <li class="page ${isActive}">${index}</li>
    `;
  }

  decriment() {
    if (this.totalPages.page === this.totalPages.total_pages) return;
    this.totalPages.page += 1;
  }
  increment() {
    if (this.totalPages.page === 1) return;
    this.totalPages.page -= 1;
  }
}
