import { Schema, model, SchemaTypes } from 'mongoose';
import Movie from './Movie.js';
import Genre from './Genre.js';
import mongooseDelete from 'mongoose-delete';

const movieGenreSchema = Schema({
  movieId: {
    type: SchemaTypes.ObjectId,
    ref: Movie,
    required: true,
  },
  genreId: {
    type: SchemaTypes.ObjectId,
    ref: Genre,
    required: true,
  },
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id
    }
  },
});


movieGenreSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const MovieGenre = model('MovieGenre', movieGenreSchema);

export default MovieGenre;



