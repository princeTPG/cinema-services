import express from 'express';

import theaterRouter, { THEATER_API_NAME_SPACE } from './theater/routes';
import theaterScreenRouter, { THEATER_SCREENS_API_NAME_SPACE } from './theaterScreen/routes';

const router = express.Router();

router.use(THEATER_API_NAME_SPACE, theaterRouter);
router.use(THEATER_SCREENS_API_NAME_SPACE, theaterScreenRouter);

export default router;
