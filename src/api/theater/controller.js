import objectGet from 'lodash/get';
import isNan from 'lodash/isNaN';

import { errors as errorStrings, theater as theaterStrings } from '../../locales';
import { theater as theaterConstants } from '../../constants';

import theaterModel from './model';
import { errorHandler, successHandler } from '../../utils/responseHandlers';

export const addTheater = async (req, res) => {
  try {
    const name = objectGet(req, 'body.name');
    const location = objectGet(req, 'body.location', {});

    if (!name || !location) {
      const data = { message: errorStrings.errorMsgValidValues };
      return errorHandler(res, data);
    }

    const response = await theaterModel.create({ location, name });

    return successHandler(res, response);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getTheaterById = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');

    const result = await theaterModel.findById(id);

    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getAllTheaters = async (req, res) => {
  try {
    const skip = parseInt(objectGet(req, 'query.skip', theaterConstants.skip), 10);
    const limit = parseInt(objectGet(req, 'query.limit', theaterConstants.limit), 10);
    const searchParams = {};

    if (isNan(skip) || isNan(limit)) {
      const data = { message: theaterStrings.limitSkipNanError };
      return errorHandler(res, data);
    }
    const [list, total] = await Promise.all([
      theaterModel.find(searchParams).limit(limit).skip(skip),
      theaterModel.countDocuments(searchParams),
    ]);

    return successHandler(res, { list, total });
  } catch (err) {
    return errorHandler(res, err);
  }
};
