import mongoose from 'mongoose';

const { Schema } = mongoose;

const theaterSchema = new Schema(
  {
    location: {
      city: String,
      phoneNumber: Number,
      state: String,
      street: String,
      zipCode: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('theater', theaterSchema, 'theater');
