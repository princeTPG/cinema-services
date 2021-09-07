import express from 'express';
import { addScreenToTheater, getScreenById, getScreenByTheaterId } from './controller';

import {
  THEATER_SCREENS_API_NAME_SPACE as _THEATER_SCREENS_API_NAME_SPACE,
  theaterScreensApi,
} from '../../constants/api';

const router = express.Router({ strict: true });

router.get(theaterScreensApi.GET_THEATER_SCREEN_BY_ID, getScreenById);
router.get(theaterScreensApi.GET_SCREENS_BY_THEATER_ID, getScreenByTheaterId);
router.post(theaterScreensApi.ADD, addScreenToTheater);

export const THEATER_SCREENS_API_NAME_SPACE = _THEATER_SCREENS_API_NAME_SPACE;
export default router;
