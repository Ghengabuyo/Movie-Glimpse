function mainPageReducer(state, action) {


  switch (action.type) {

    case "SET_ALL_MOVIES":
      return {
        ...state,
        allMovies: action.payload
      };

    case "SET_DISCOVER_MOVIES":
      return {
        ...state,
        discoverMovies: action.payload
      };

    case "SET_TRENDING_MOVIES":
      return {
        ...state,
        trendingMovies: action.payload
      };

    case "SET_TOP_RATED_MOVIES":
      return {
        ...state,
        topRatedMovies: action.payload

      };

    case "SET_UPCOMING_MOVIES":
      return {
        ...state,
        upcomingMovies: action.payload

      };

    case "ADD_TO_FAVORITES":
      const { id, posterPath, title } = action.payload;

      const index = state.favorites.findIndex(movie => movie.id === id);

      if (index === -1) {
        const updatedFavorites = [...state.favorites, { id, posterPath, title }];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return {
          ...state,
          favorites: updatedFavorites,
        };
      }
      return state;
    case "LOAD_FAVORITES":
      return { ...state, favorites: action.payload };

    case "REMOVE_FAVORITE":
      const updatedFavorites = state.favorites.filter(favorite => favorite.id !== action.payload);
      return { ...state, favorites: updatedFavorites };

    default:
      return state;
  }

}
export default mainPageReducer;