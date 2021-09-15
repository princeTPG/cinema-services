import objectGet from 'lodash/get';
import isNan from 'lodash/isNaN';

import { errors as errorStrings, movie as movieStrings } from '../../locales';
import { movie as movieConstants } from '../../constants';

import movieModel from './model';
import { errorHandler, successHandler } from '../../utils/responseHandlers';
import { deleteFile } from '../../services/awsImageUpload';

export const addMovie = async (req, res) => {
  try {
    const crewMembers = objectGet(req, 'body.crewMembers');
    const castMembers = objectGet(req, 'body.castMembers');
    const plot = objectGet(req, 'body.plot');
    const posterUrl = objectGet(req, 'file.location');
    const releaseDate = new Date(objectGet(req, 'body.releaseDate'));
    const runTime = objectGet(req, 'body.runTime');
    const title = objectGet(req, 'body.title');

    if (
      !title ||
      !runTime ||
      !releaseDate ||
      !posterUrl ||
      !plot ||
      !crewMembers ||
      !castMembers
    ) {
      const fileKey = objectGet(req, 'file.key');
      const data = { message: errorStrings.errorMsgValidValues };
      await deleteFile(fileKey);
      return errorHandler(res, data);
    }

    const response = await movieModel.create({
      castMembers,
      crewMembers,
      plot,
      posterUrl,
      releaseDate,
      runTime,
      title,
    });

    return successHandler(res, response);
  } catch (err) {
    const fileKey = objectGet(req, 'file.key');
    await deleteFile(fileKey);
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

export const getAllMovies = async (req, res) => {
  try {
    const skip = parseInt(
      objectGet(req, 'query.skip', movieConstants.skip),
      10,
    );
    const limit = parseInt(
      objectGet(req, 'query.limit', movieConstants.limit),
      10,
    );
    const searchParams = {};

    if (isNan(skip) || isNan(limit)) {
      const data = { message: movieStrings.limitSkipNanError };
      return errorHandler(res, data);
    }
    const [list, total] = await Promise.all([
      movieModel.find(searchParams).limit(limit).skip(skip),
      movieModel.countDocuments(searchParams),
    ]);

    return successHandler(res, { list, total });
  } catch (err) {
    return errorHandler(res, err);
  }
};
