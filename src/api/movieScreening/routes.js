import express from 'express';
import {
  addMovieScreening,
  getMovieScreeningById,
  getMoviesScreeningByMovieId,
  getMoviesScreeningsByScreenId,
  getMoviesScreeningsByTheaterId,
} from './controller';

import {
  MOVIE_SCREENING_API_NAME_SPACE as _MOVIE_SCREENING_API_NAME_SPACE,
  movieScreeningApi,
} from '../../constants/api';

const router = express.Router();

router.post(movieScreeningApi.ADD, addMovieScreening);
router.get(
  movieScreeningApi.GET_MOVIES_SCREENING_BY_MOVIE_ID,
  getMoviesScreeningByMovieId,
);
router.get(
  movieScreeningApi.GET_MOVIES_SCREENING_BY_SCREEN_ID,
  getMoviesScreeningsByScreenId,
);
router.get(
  movieScreeningApi.GET_MOVIES_SCREENING_BY_THEATER_ID,
  getMoviesScreeningsByTheaterId,
);
router.get(movieScreeningApi.GET_MOVIE_SCREENING_BY_ID, getMovieScreeningById);

export const MOVIE_SCREENING_API_NAME_SPACE = _MOVIE_SCREENING_API_NAME_SPACE;
export default router;
