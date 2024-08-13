import mongoose from 'mongoose';
import process from 'node:process';

async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI);
}

export default connectDb;
