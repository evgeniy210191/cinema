export default class DefaultRequest {
  constructor() {
    this.page = 1;
    this.key = 'ef54c316f166b2a5913791e8b3f63a4a';
  }
  async getData() {
    const option = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
      },
    };
    ('https://www.themoviedb.org/zZGG7jsktlGaenPeknKSZZtVZ9T.jpg');
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.key}&page=${this.page}&include_adult=false`;
    const response = await fetch(URL, option);
    const data = await response.json();
    return data;
  }
}
