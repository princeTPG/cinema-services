import mongoose from 'mongoose';

const { Schema } = mongoose;

const movieScreening = new Schema(
  {
    movie: {
      ref: 'movie',
      type: Schema.Types.ObjectId,
    },
    screen: {
      ref: 'theaterScreen',
      type: Schema.Types.ObjectId,
    },
    seatsRemaining: {
      type: Number,
    },
    startTime: {
      type: Date,
    },
    theater: {
      ref: 'theater',
      type: Schema.Types.ObjectId,
    },
    ticketPricing: {
      adult: Number,
      child: Number,
    },
    totalSeats: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model(
  'movieScreening',
  movieScreening,
  'movieScreening',
);
