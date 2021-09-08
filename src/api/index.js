import express from 'express';

import movieRouter, { MOVIE_API_NAME_SPACE } from './movie/routes';
import theaterRouter, { THEATER_API_NAME_SPACE } from './theater/routes';
import theaterScreenRouter, { THEATER_SCREENS_API_NAME_SPACE } from './theaterScreen/routes';

const router = express.Router();

router.use(MOVIE_API_NAME_SPACE, movieRouter);
router.use(THEATER_API_NAME_SPACE, theaterRouter);
router.use(THEATER_SCREENS_API_NAME_SPACE, theaterScreenRouter);

export default router;
