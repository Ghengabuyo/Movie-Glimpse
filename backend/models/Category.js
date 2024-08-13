import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  }
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id
    }
  },
});


categorySchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Category = model('Category', categorySchema)

export default Category; 