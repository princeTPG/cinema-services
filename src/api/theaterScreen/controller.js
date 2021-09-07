import objectGet from 'lodash/get';

import { errors as errorStrings, theaterScreens as theaterScreensStrings } from '../../locales';

import theaterModel from '../theater/model';
import screenModel from './model';
import { errorHandler, successHandler } from '../../utils/responseHandlers';

const theaterPopulate = {
  path: 'theater',
  select: ['name', 'location'],
};

export const addScreenToTheater = async (req, res) => {
  try {
    const name = objectGet(req, 'body.name');
    const theaterId = objectGet(req, 'body.theaterId');
    const totalRows = objectGet(req, 'body.totalRows');
    const totalColumns = objectGet(req, 'body.totalRows');

    if (!name || !theaterId || !totalRows || !totalColumns) {
      const data = { message: errorStrings.errorMsgValidValues };
      return errorHandler(res, data);
    }

    const theater = await theaterModel.findById(theaterId);
    if (!theater) {
      const data = { message: theaterScreensStrings.noTheaterFound };
      return errorHandler(res, data);
    }

    const screenResp = await screenModel.create({
      name,
      theater: theaterId,
      totalColumns,
      totalRows,
    });

    const finalResp = await screenModel
      // eslint-disable-next-line no-underscore-dangle
      .findById(screenResp._id)
      .populate(theaterPopulate);

    return successHandler(res, finalResp);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getScreenById = async (req, res) => {
  try {
    const id = objectGet(req, 'params.id', '');

    const result = await screenModel.findById(id).populate(theaterPopulate);
    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const getScreenByTheaterId = async (req, res) => {
  try {
    const theater = objectGet(req, 'params.id', '');

    const result = await screenModel.findOne({ theater }).populate(theaterPopulate);

    return successHandler(res, result);
  } catch (err) {
    return errorHandler(res, err);
  }
};
