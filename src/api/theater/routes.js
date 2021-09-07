import express from 'express';
import { addTheater, getTheaterById, getAllTheaters } from './controller';

import { THEATER_API_NAME_SPACE as _THEATER_API_NAME_SPACE, theaterApi } from '../../constants/api';

const router = express.Router();

router.post(theaterApi.ADD, addTheater);
router.get(theaterApi.GET_ALL, getAllTheaters);
router.get(theaterApi.GET_THEATER_BY_ID, getTheaterById);

export const THEATER_API_NAME_SPACE = _THEATER_API_NAME_SPACE;
export default router;
