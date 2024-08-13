import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const genreSchema = Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id
    }
  },
});


genreSchema.plugin(mongooseDelete, { overrideMethods: 'all '});

const Genre = model('Genre', genreSchema)

export default Genre; 