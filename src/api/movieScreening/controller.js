import objectGet from 'lodash/get';

import { errors as errorStrings } from '../../locales';

import movieScreeningModel from './model';
import { errorHandler, successHandler } from '../../utils/responseHandlers';

const theaterPopulate = {
  path: 'theater',
  select: ['name', 'location'],
};
const screenPopulate = {
  path: 'screen',
  select: ['name', 'totalRows', 'totalColumns'],
};
const moviePopulate = {
  path: 'movie',
};

export const addMovieScreening = async (req, res) => {
  try {
    const movie = objectGet(req, 'body.movie');
    const screen = objectGet(req, 'body.screen');
    const totalSeats = objectGet(req, 'body.totalSeats');
    const startTime = new Date(objectGet(req, 'body.startTime'));
    const theater = objectGet(req, 'body.theater');
    const ticketPricing = objectGet(req, 'body.ticketPricing');

    if (
      !movie ||
      !screen ||
      !totalSeats ||
      !startTime ||
      !theater ||
      !ticketPricing
    ) {
      const data = { message: errorStrings.errorMsgValidValues };
      return errorHandler(res, data);
    }

    const response = await movieScreeningModel.create({
      movie,
      screen,
      seatsRemaining: totalSeats,
      startTime,
      theater,
      ticketPricing,
      totalSeats,
    });

    return successHandler(res, response);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getMovieScreeningById = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');
    const result = await movieScreeningModel
      .findById(id)
      .populate(theaterPopulate)
      .populate(screenPopulate)
      .populate(moviePopulate);
    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getMoviesScreeningByMovieId = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');
    const result = await movieScreeningModel
      .find({ movie: id })
      .populate(theaterPopulate)
      .populate(screenPopulate)
      .populate(moviePopulate);
    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getMoviesScreeningsByScreenId = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');
    const result = await movieScreeningModel
      .find({ screen: id })
      .populate(theaterPopulate)
      .populate(screenPopulate)
      .populate(moviePopulate);
    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getMoviesScreeningsByTheaterId = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');
    const result = await movieScreeningModel
      .find({ theater: id })
      .populate(theaterPopulate)
      .populate(screenPopulate)
      .populate(moviePopulate);
    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};
