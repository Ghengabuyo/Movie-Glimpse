function contentPageReducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload
      };

    case "SET_POSTER_PATH":
      return {
        ...state,
        posterPath: action.payload
      };

    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload
      };

    case "SET_ORIGINAL_LANGUAGE":
      return {
        ...state,
        originalLanguage: action.payload
      };

    case "SET_TRAILER_VIDEO":
      return {
        ...state,
        trailerVideo: action.payload
      };

    case "SET_GENRES":
      return {
        ...state,
        genres: action.payload
      };


    case "SET_VOTE_AVERAGE":
      return {
        ...state,
        voteAverage: action.payload
      };


    case "ADD_TO_FAVORITES":
      const { id, posterPath, title } = action.payload;
      const isAlreadyAdded = state.favorites.some(movie => movie.id === id);

      if (!isAlreadyAdded) {
        const updatedFavorites = [...state.favorites, { id, posterPath, title }];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        return {
          ...state,
          favorites: updatedFavorites,
        };
      }
      return state;

    case "REMOVE_FROM_FAVORITES":
      const updatedFavorites = state.favorites.filter(movie => movie.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorites: updatedFavorites,
      };

    case "LOAD_FAVORITES":
      return {
        ...state,
        favorites: action.payload
      };

    default:
      return state;
  }
}

export default contentPageReducer;
