import objectGet from 'lodash/get';

import { errors as errorStrings } from '../../locales';

import movieModel from './model';
import { errorHandler, successHandler } from '../../utils/responseHandlers';

export const addMovie = async (req, res) => {
  try {
    const crewMembers = objectGet(req, 'body.crewMembers');
    const castMember = objectGet(req, 'body.castMember');
    const plot = objectGet(req, 'body.plot');
    const posterUrl = objectGet(req, 'body.posterUrl');
    const releaseDate = objectGet(req, 'body.releaseDate');
    const runTime = objectGet(req, 'body.runTime');
    const title = objectGet(req, 'body.title');

    if (!title || !runTime || !releaseDate || !posterUrl || !plot || !crewMembers || !castMember) {
      const data = { message: errorStrings.errorMsgValidValues };
      return errorHandler(res, data);
    }

    const response = await movieModel.create({
      castMember,
      crewMembers,
      plot,
      posterUrl,
      releaseDate,
      runTime,
      title,
    });

    return successHandler(res, response);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getMovieById = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');

    const result = await movieModel.findById(id);

    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};
