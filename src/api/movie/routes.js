import express from 'express';
import { addMovie, getMovieById } from './controller';

import { MOVIE_API_NAME_SPACE as _MOVIE_API_NAME_SPACE, movieApi } from '../../constants/api';

const router = express.Router();

router.post(movieApi.ADD, addMovie);
router.get(movieApi.GET_MOVIE_BY_ID, getMovieById);

export const MOVIE_API_NAME_SPACE = _MOVIE_API_NAME_SPACE;
export default router;
