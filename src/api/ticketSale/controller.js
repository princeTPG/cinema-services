import objectGet from 'lodash/get';

import { errors as errorStrings, tickets as strings } from '../../locales';

import ticketSaleModel from './model';
import movieScreeningModel from '../movieScreening/model';
import { errorHandler, successHandler } from '../../utils/responseHandlers';

const ticketSaleTheaterPopulate = {
  path: 'movieScreening',
  populate: { path: 'theater', select: ['location', 'name'] },
  select: ['theater'],
};
const ticketSaleMoviePopulate = {
  path: 'movieScreening',
  populate: { path: 'movie' },
  select: ['movie', 'ticketPricing', 'totalSeats'],
};
const ticketSaleMovieScreenPopulate = {
  path: 'movieScreening',
  populate: { path: 'screen' },
  select: ['screen'],
};

export const addTicket = async (req, res) => {
  try {
    const column = objectGet(req, 'body.column');
    const movieScreening = objectGet(req, 'body.movieScreening');
    const row = objectGet(req, 'body.row');
    const userEmail = objectGet(req, 'body.userEmail');
    const userName = objectGet(req, 'body.userName');

    if (!movieScreening || !userEmail || !userName || !column || !row) {
      const data = { message: errorStrings.errorMsgValidValues };
      return errorHandler(res, data);
    }

    const [
      {
        screen: { totalRows, totalColumns },
      },
      tickets,
    ] = await Promise.all([
      movieScreeningModel
        .findById(movieScreening)
        .select('screen')
        .populate({
          path: 'screen',
          select: ['totalColumns', 'totalRows'],
        }),
      ticketSaleModel.count({
        column,
        movieScreening,
        row,
      }),
    ]);
    // check for row/column is valid or not.
    if (row > totalRows || column > totalColumns) {
      return successHandler(res, {
        message: strings.invalidSeat,
      });
    }
    // check for if there is any ticket with given row/column and movidesScreening
    if (tickets > 0) {
      return successHandler(res, {
        message: strings.columnRowAlreadyTaken,
      });
    }

    const [response] = await Promise.all([
      ticketSaleModel.create({
        column,
        movieScreening,
        row,
        userEmail,
        userName,
      }),
      movieScreeningModel.update(
        { _id: movieScreening },
        { $inc: { seatsRemaining: -1 } },
      ),
    ]);
    return successHandler(res, response);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getTicketById = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');
    const result = await ticketSaleModel
      .findById(id)
      .populate(ticketSaleTheaterPopulate)
      .populate(ticketSaleMoviePopulate)
      .populate(ticketSaleMovieScreenPopulate)
      .populate({
        path: 'movieScreening',
        populate: '*',
      });
    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};
