export default defaultRequest = {
  key: 'ef54c316f166b2a5913791e8b3f63a4a',
  searchData: '',
  time: '/day',
  search: 'trending',
  async getData(page = 1) {
    const option = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
      },
    };

    const URL = `https://api.themoviedb.org/3/${this.search}/movie${this.time}?api_key=${this.key}&query=${this.searchData}&page=${page}&include_adult=false&language=uk`;
    const response = await fetch(URL, option);
    const data = await response.json();
    return data;
  },
  get query() {
    return this.searchData;
  },

  set query(query) {
    this.searchData = query;
    this.time = '';
    this.search = 'search';
  },
};
