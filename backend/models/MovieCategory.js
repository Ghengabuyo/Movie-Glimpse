import { Schema, model, SchemaTypes } from 'mongoose';
import Category from './Category.js';
import Movie from './Movie.js';
import mongooseDelete from 'mongoose-delete';

const movieCategorySchema = Schema({
  movieId: {
    type: SchemaTypes.ObjectId,
    ref: Movie,
    required: true,
  },
  categoryId: {
    type: SchemaTypes.ObjectId,
    ref: Category,
    required: true,
  },
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id
    }
  },
});

movieCategorySchema.plugin(mongooseDelete, { overrideMethods: 'all' })


const MovieCategory = model('MovieCategory', movieCategorySchema);

export default MovieCategory;
