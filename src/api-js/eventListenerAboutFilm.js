export function eventListenersModal() {
  document.addEventListener('click', event => {
    if (event.target.closest('.films')) {
      modal.render(event.target.parentNode.dataset.atrebutInfo);
    }
    if (event.target.closest('.close')) {
      if (this.isOpen.classList.contains('is-open')) {
        this.isOpen.classList.remove('is-open');
        this.body.classList.remove('is-hidden');
      }
    }
    if (event.target.id === 'wotched') {
      const idFilms = localStorage.getItem('idFilmsWotched');
      if (idFilms) {
        const parsId = JSON.parse(idFilms);
        parsId.push(event.target.dataset.id);
        localStorage.setItem('idFilmsWotched', JSON.stringify(parsId));
        return;
      }
      localStorage.setItem(
        'idFilmsWotched',
        JSON.stringify([event.target.dataset.id])
      );
    }

    if (event.target.id === 'queue') {
      const idFilms = localStorage.getItem('idFilmsQueue');
      if (idFilms) {
        const parsId = JSON.parse(idFilms);
        parsId.push(event.target.dataset.id);
        localStorage.setItem('idFilmsQueue', JSON.stringify(parsId));
        return;
      }
      localStorage.setItem(
        'idFilmsQueue',
        JSON.stringify([event.target.dataset.id])
      );
    }
  });
}
