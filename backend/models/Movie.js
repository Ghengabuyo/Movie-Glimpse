import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';


const movieSchema = new Schema(
  {
    title: String,
    overview: String,
    poster_path: String,
    original_language: String,
    vote_average: Number,
  },
  {
    timestamps: true,
    strict: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
      }
    },
  }
);


movieSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Movie = model('Movie', movieSchema);

export default Movie;