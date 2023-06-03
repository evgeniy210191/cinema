export default aboutFilmFetch = {
  key: 'ef54c316f166b2a5913791e8b3f63a4a',

  async getData(id) {
    const option = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU0YzMxNmYxNjZiMmE1OTEzNzkxZThiM2Y2M2E0YSIsInN1YiI6IjY0NzBkZmZhYzVhZGE1MDBjMWEzNzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fljmrABHLVGUf2e0aWKvdHeTeR0ruZNkP26DhsQLuYM',
      },
    };
    const request = `https://api.themoviedb.org/3/movie/${id}?language=uk`;
    const response = await fetch(request, option);
    const film = await response.json();
    return film;
  },
};
