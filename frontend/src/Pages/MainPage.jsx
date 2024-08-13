import React, { useEffect, useContext, useReducer, useState } from "react";
import nameContext from "../Contexts/nameContext";
import Header from "../Components/Header";
import DiscoverMovies from "../Components/DiscoverMovies";
import TrendingMovies from "../Components/TrendingMovies";
import TopRatedMovies from "../Components/TopRatedMovies";
import UpcomingMovies from "../Components/UpcomingMovies";
import AllMovies from "../Components/AllMovies";
import style from './MainPage.module.css';
import mainPageReducer from "../Reducer/mainPageReducer";
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel


} from "@chakra-ui/react";
import Search from "../Components/Search";


function MainPage() {
  const { setDisplayName } = useContext(nameContext);


  const initState = {
    allMovies: [],
    discoverMovies: [],
    trendingMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    favorites: [],
  };


  const [state, dispatch] = useReducer(mainPageReducer, initState);
  const { allMovies, discoverMovies, trendingMovies, topRatedMovies, upcomingMovies, favorites } = state;
  const [searchMovie, setSearchMovie] = useState('');


  useEffect(() => {
    const savedDisplayName = localStorage.getItem('displayName');
    if (savedDisplayName) {
      setDisplayName(savedDisplayName);
    }
  }, []);


  useEffect(() => {
    fetchMovieDetails();
  }, []);


  const discoverMoviesId = '66964cc3790305aee8aa45bb'
  const trendingMoviesId = '66964cc3790305aee8aa45bc'
  const topRatedMoviesId = '66964cc3790305aee8aa45bd'
  const upcomingMoviesId = '66964cc3790305aee8aa45be'


  const fetchMovieDetails = async () => {


    try {
      const [allMoviesResponse, discoverResponse, trendingResponse, topRatedResponse, upcomingResponse] = await Promise.all([

        fetch(`${import.meta.env.VITE_BACKEND_URI}/movies`),
        fetch(`${import.meta.env.VITE_BACKEND_URI}/categories/${discoverMoviesId}/movies`),
        fetch(`${import.meta.env.VITE_BACKEND_URI}/categories/${trendingMoviesId}/movies`),
        fetch(`${import.meta.env.VITE_BACKEND_URI}/categories/${topRatedMoviesId}/movies`),
        fetch(`${import.meta.env.VITE_BACKEND_URI}/categories/${upcomingMoviesId}/movies`),
      ]);


      const [allMoviesJson, discoverJson, trendingJson, topRatedJson, upcomingJson] = await Promise.all([
        allMoviesResponse.json(),
        discoverResponse.json(),
        trendingResponse.json(),
        topRatedResponse.json(),
        upcomingResponse.json()
      ]);


      dispatch({ type: 'SET_ALL_MOVIES', payload: allMoviesJson.data });
      dispatch({ type: "SET_DISCOVER_MOVIES", payload: discoverJson.data });
      dispatch({ type: "SET_TRENDING_MOVIES", payload: trendingJson.data });
      dispatch({ type: "SET_TOP_RATED_MOVIES", payload: topRatedJson.data });
      dispatch({ type: "SET_UPCOMING_MOVIES", payload: upcomingJson.data });

      

    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };




  const handleSearchMovie = (e) => {
    setSearchMovie(e.target.value);
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    dispatch({ type: "LOAD_FAVORITES", payload: savedFavorites });
  }, []);




  const removeFavorite = (id) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
    // Update localStorage to store the updated favorites
    const updatedFavorites = favorites.filter(favorite => favorite.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };



///////




  return (
    <>
      <div className={style.backgroundStyle}>
        <Header
          favorites={favorites}
          onSearchChange={handleSearchMovie}
          onRemoveFavorite={removeFavorite}
        />

        <Tabs variant='enclosed' colorScheme='blue'>
          <TabList
            overflow='hidden'
            bg='white'
            justifyContent="center"
            alignItems="center"
            fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
          >

            <Tab
              fontSize={{ base: 'xs', md: 'md', lg: 'lg', xl: 'xl' }}
              _selected={{ color: 'white', bg: 'blue.500' }}
              px={[3, 5, 6, 7]}>
              All
            </Tab>


            <Tab
              fontSize={{ base: 'xs', md: 'md', lg: 'lg', xl: 'xl' }}
              _selected={{ color: 'white', bg: 'blue.500' }}
              px={[2, 3, 4, 5]}>
              Discover
            </Tab>


            <Tab
              fontSize={{ base: 'xs', md: 'md', lg: 'lg', xl: 'xl' }}
              _selected={{ color: 'white', bg: 'blue.500' }}
              px={[2, 3, 4, 5]}>
              Trending
            </Tab>


            <Tab
              fontSize={{ base: 'xs', md: 'md', lg: 'lg', xl: 'xl' }}
              _selected={{ color: 'white', bg: 'blue.500' }}
              px={[2, 3, 4, 5]}>
              Top Rated
            </Tab>


            <Tab
              fontSize={{ base: 'xs', md: 'md', lg: 'lg', xl: 'xl' }}
              _selected={{ color: 'white', bg: 'blue.500' }}
              px={[2, 3, 4, 5]}>
              Upcoming
            </Tab>


          </TabList>


          <Search value={searchMovie} onChange={handleSearchMovie} />


          <TabPanels mt="-10">
            <TabPanel>
              <AllMovies movies={allMovies} searchMovie={searchMovie} />
              {/* <AllMovies movies={filterMovies()} searchMovie={searchMovie} /> */}
            </TabPanel>
            <TabPanel>
              <DiscoverMovies movies={discoverMovies} searchMovie={searchMovie} />
            </TabPanel>
            <TabPanel>
              <TrendingMovies movies={trendingMovies} searchMovie={searchMovie} />
            </TabPanel>
            <TabPanel>
              <TopRatedMovies movies={topRatedMovies} searchMovie={searchMovie} />
            </TabPanel>
            <TabPanel>
              <UpcomingMovies movies={upcomingMovies} searchMovie={searchMovie} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}


export default MainPage;
