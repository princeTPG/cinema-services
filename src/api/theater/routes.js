import express from 'express';
import bodyParser from 'body-parser';
import { addTheater, getTheaterById, getAllTheaters } from './controller';

import {
  THEATER_API_NAME_SPACE as _THEATER_API_NAME_SPACE,
  theaterApi,
} from '../../constants/api';

// Need to update this for mocha unit test
const router = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post(theaterApi.ADD, addTheater);
router.get(theaterApi.GET_ALL, getAllTheaters);
router.get(theaterApi.GET_THEATER_BY_ID, getTheaterById);

export const THEATER_API_NAME_SPACE = _THEATER_API_NAME_SPACE;
export default router;
