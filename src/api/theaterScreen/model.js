import mongoose from 'mongoose';

const { Schema } = mongoose;

const theaterScreenSchema = new Schema(
  {
    name: {
      type: String,
    },
    theater: {
      ref: 'theater',
      type: Schema.Types.ObjectId,
    },
    totalColumns: {
      type: Number,
    },
    totalRows: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('theaterScreen', theaterScreenSchema, 'theaterScreen');
