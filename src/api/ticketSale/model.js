import mongoose from 'mongoose';

const { Schema } = mongoose;

const ticketSale = new Schema(
  {
    column: {
      type: Number,
    },
    movieScreening: {
      ref: 'movieScreening',
      type: Schema.Types.ObjectId,
    },
    row: {
      type: Number,
    },
    ticketPrice: {
      type: Number,
    },
    userEmail: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('ticket', ticketSale, 'ticket');
