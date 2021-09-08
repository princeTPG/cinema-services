import mongoose from 'mongoose';

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    castMembers: [
      {
        character: String,
        name: String,
      },
    ],
    crewMembers: [
      {
        name: String,
      },
    ],
    plot: {
      type: String,
    },
    posterUrl: {
      type: String,
    },
    releaseDate: {
      type: Date,
    },
    // runTime will be in seconds
    runTime: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('movie', movieSchema, 'movie');
