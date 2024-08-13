import bodyParser from 'body-parser';
import express from 'express';
import process from 'node:process';
import cors from 'cors';
import connectDb from './connectDb.js';
import { StatusCodes } from 'http-status-codes';
import Movie from './models/Movie.js';
import Category from './models/Category.js';
import MovieCategory from './models/MovieCategory.js';
import Genre from './models/Genre.js';
import MovieGenre from './models/MovieGenre.js';
import 'dotenv/config';
import helmet from 'helmet';


const app = express();
const PORT = process.env.PORT || 3000;
app.set('port', PORT);


connectDb();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});


/////////////////////////////////////////              M O V I E    E N D P O I N T S                        ////////////////////////////

//GET ALL MOVIES
app.get('/movies', async (req, res) => {
  try {

    const movies = await Movie.find();

    // Fetch categories and genres for each movie and include them in the movie object
    const moviesWithDetails = await Promise.all(movies.map(async (movie) => {


      const movieCategories = await MovieCategory          // Find all categories for the current movie
        .find({ movieId: movie._id })
        .populate('categoryId');

      const categories = movieCategories.map(mc => mc.categoryId.name);


      const movieGenres = await MovieGenre         // Find all genres for the current movie
        .find({ movieId: movie._id })
        .populate('genreId');

      const genres = movieGenres.map(mg => mg.genreId.name);

    
      return {
        ...movie.toObject(),
        categories: categories,
        id: movie._id,
        genres: genres
      };
    }));

    res.status(StatusCodes.OK).json({
      data: moviesWithDetails
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching movies with categories and genres',
      error: error.message
    });
  }
});


// GET A MOVIE BY ID
app.get('/movies/:id', async (req, res) => {

  const { id } = req.params;                   // Movie ID from request parameters

  try {
    const movie = await Movie.findById(id);         // Fetch the movie by ID

    if (!movie) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Movie not found'
      });
    }

    // Fetch categories for the movie
    const movieCategories = await MovieCategory
      .find({ movieId: movie._id })
      .populate('categoryId');
    const categories = movieCategories.map(mc => mc.categoryId.name);

    // Fetch genres for the movie
    const movieGenres = await MovieGenre
      .find({ movieId: movie._id })
      .populate('genreId');
    const genres = movieGenres.map(mg => mg.genreId.name);


    res.status(StatusCodes.OK).json({
      data: {
        ...movie.toObject(),
        id: movie._id,
        categories,
        genres,
      }
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching the movie details',
      error: error.message
    });
  }
});



////   CREATE A MOVIE    ////                                                           
app.post('/movies', async (req, res) => {
  const { body } = req;

  try {
    const newMovie = await Movie.create(body);
    res.status(StatusCodes.CREATED).json({
      data: newMovie
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while creating the movie',
      error: error.message
    });
  };
});



// UPDATE A MOVIE BY ID
app.patch('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, body, {
      new: true,
    });


    if (updatedMovie === null)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Movie not found.',
      });


    res.status(StatusCodes.OK).json({
      data: updatedMovie,
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while updating the movie',
      error: error.message
    });
  }
});




// DELETE A MOVIE BY ID
app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.deleteById(id);

    if (!deletedMovie) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'Movie not found.',
      });
    }


    res.status(StatusCodes.NO_CONTENT).json({
      data: deletedMovie
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while deleting the movie',
      error: error.message
    });
  }
});



/////////////////////////////////////////              C A T E G O R Y    E N D P O I N T S                        ////////////////////////////



// GET ALL CATEGORIES
app.get('/categories', async (req, res) => {

  try {
    const { type } = req.query;
    let query = {};

    if (type) {
      query.type = type;
    }

    const categories = await Category.find(query);

    res.status(StatusCodes.OK).json({
      data: categories
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching categories',
      error: error.message
    });
  }
});




//GET ALL MOVIES IN A CATEGORY
app.get('/categories/:id/movies', async (req, res) => {

  const { id } = req.params;          // Category ID

  try {

    const movieCategories = await MovieCategory.find({
      categoryId: id,
    })

      .populate('movieId')
      .populate('categoryId');


    // Return a response of all movies
    res.status(StatusCodes.OK).json({
      message: 'All Movies in this category',
      data: movieCategories,
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching movies for the category',
      error: error.message
    });
  }
});




// GET A CATEGORY BY ID
app.get('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

    res.status(StatusCodes.OK).json({
      data: category
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching the category',
      error: error.message
    });
  }
});

app.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.deleteById(id);

    if (!deletedCategory) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'Category not found.',
      });
    }

    res.status(StatusCodes.NO_CONTENT).json({
      data: deletedCategory
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while deleting the category',
      error: error.message
    });
  }
});




////     CREATE A CATEGORY    ////
app.post('/categories', async (req, res) => {

  try {
    const { name } = req.body;

    // Instance of the category
    const category = new Category({ name });
    await category.save();


    res.status(StatusCodes.CREATED).json({
      message: 'Category is Added',
      data: category,

    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while creating the category',
      error: error.message
    });
  }
});





//ADD MOVIES TO A CATEGORY
app.post('/categories/:id/movies', async (req, res) => {
  const { id } = req.params;            // Category ID

  try {
    const category = await Category.findById(id);

    if (category === null) {                 /// check if category exists

      res.status(StatusCodes.NOT_FOUND).json({
        message: 'Category Not Found',
      });

      return;
    }

    const { movieIds } = req.body;

    for (const movieId of movieIds) {
      const movieCategory = new MovieCategory({
        movieId,
        categoryId: id,
      });

      await movieCategory.save();
    }

    res.status(StatusCodes.CREATED).json({
      message: 'Movies have been added to this category',
      data: movieIds,
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while adding movies to the category',
      error: error.message
    });
  }
});



// UPDATE A CATEGORY BY ID
app.patch('/categories/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const { body } = req;

    const updatedCategory = await Category.findByIdAndUpdate(id, body, {
      new: true
    });

    if (!updatedCategory) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Category not found'
      });
    }

    res.status(StatusCodes.OK).json({
      data: updatedCategory
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while updating the category',
      error: error.message
    });
  }
});


//DELETE A CATEGORY BY ID
app.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.deleteById(id);

    if (!deletedCategory) {
      return res.status(StatusCodes.NO_CONTENT).json({
        message: 'Category not found'
      });
    }

    res.status(StatusCodes.NO_CONTENT).json({
      data: deletedCategory
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while deleting the category',
      error: error.message
    });
  }
});




////////////////////////////////////////////////////                G E N R E   E N D P O I N T S                        //////////////////////////////////////



////     GET ALL GENRES    ////
app.get('/genres', async (req, res) => {
  try {
    const genres = await Genre.find();

    res.status(StatusCodes.OK).json({
      data: genres
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching genres',
      error: error.message
    });
  }
});


////   GET A GENRE BY ID    /////
app.get('/genres/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);

    if (!genre) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Genre not found'
      });
    }
    res.status(StatusCodes.OK).json({
      data: genre
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching the genre',
      error: error.message
    });
  }
});



////  GET ALL MOVIES IN A GENRE    //// 
app.get('/genres/:id/movies', async (req, res) => {

  try {
    const { id } = req.params;
    const movieGenres = await MovieGenre.find({
      genreId: id
    })

      .populate('movieId');

    if (!movieGenres) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No movies found for this genre'
      });
    }
    const movies = movieGenres.map(mg => mg.movieId);
    res.status(StatusCodes.OK).json({
      data: movies
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching movies for the genre',
      error: error.message
    });
  }
});



////   CREATE A GENRE   ////
app.post('/genres', async (req, res) => {

  try {
    const { name } = req.body;
    const genre = new Genre({ name });

    await genre.save();

    res.status(StatusCodes.CREATED).json({
      message: 'Genre is Added',
      data: genre,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while creating the genre',
      error: error.message
    });
  }
});





////  ADD MOVIES TO GENRE  ////
app.post('/genres/:id/movies', async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findById(id);

    if (genre === null) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'Genre Not Found',
      });
      return;
    }

    const { movieIds } = req.body;

    for (const movieId of movieIds) {
      const movieGenre = new MovieGenre({
        movieId,
        genreId: id,
      });

      await movieGenre.save();
    }


    res.status(StatusCodes.CREATED).json({
      message: 'Movies have been added to this genre',
      data: movieIds,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while adding movies to the genre',
      error: error.message
    });
  }
});



////   UPDATE A GENRE BY ID   ////
app.patch('/genres/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const { body } = req;
    const updatedGenre = await Genre.findByIdAndUpdate(id, body, {
      new: true
    });

    if (!updatedGenre) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Genre not found'
      });
    }
    res.status(StatusCodes.OK).json({
      data: updatedGenre
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while updating the genre',
      error: error.message
    });
  }
});



////   DELETE A GENRE BY ID   ////
app.delete('/genres/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const deletedGenre = await Genre.deleteById(id);

    if (!deletedGenre) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Genre not found'
      });
    }
    res.status(StatusCodes.NO_CONTENT).json({
      data: deletedGenre
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while deleting the genre',
      error: error.message
    });
  }
});





////////////////////////////////////////////////////////     MOVIECATEGORY  EN D P O I N T S    ////////////////////////////////////




////    GET ALL MOVIECATEGORY RELATIONS   ////
app.get('/movieCategories', async (req, res) => {
  try {
    const movieCategories = await MovieCategory.find()
      .populate('movieId categoryId');

    res.status(StatusCodes.OK).json({
      data: movieCategories
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while fetching movie-category relations',
      error: error.message
    });
  }
});



////////////////////////////////////////////////////////     MOVIEGENRE  EN D P O I N T S    ////////////////////////////////////


////   GET ALL MOVIEGENRES RELTIONS

app.get('/movieGenres', async (req, res) => {
  try {
    const movieGenres = await MovieGenre.find()
      .populate('movieId genreId');

    res.status(200).json({
      data: movieGenres
    });

  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching movie-genre relations',
      error: error.message
    });
  }
});




app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});




