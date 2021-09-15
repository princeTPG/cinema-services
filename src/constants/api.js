const NAME_SPACE = '/api/v1';

export const statusApi = {
  CHECK_STATUS: `${NAME_SPACE}/status`,
};

export const THEATER_SCREENS_API_NAME_SPACE = `${NAME_SPACE}/theaterScreens`;
export const theaterScreensApi = {
  ADD: '/add',
  GET_SCREENS_BY_THEATER_ID: '/theater/:id',
  GET_THEATER_SCREEN_BY_ID: '/:id',
};

export const THEATER_API_NAME_SPACE = `${NAME_SPACE}/theater`;
export const theaterApi = {
  ADD: '/add',
  GET_ALL: '/all',
  GET_THEATER_BY_ID: '/:id',
};

export const MOVIE_API_NAME_SPACE = `${NAME_SPACE}/movie`;
export const movieApi = {
  ADD: '/add',
  GET_ALL: '/all',
  GET_MOVIE_BY_ID: '/:id',
};

export const MOVIE_SCREENING_API_NAME_SPACE = `${NAME_SPACE}/movieScreening`;
export const movieScreeningApi = {
  ADD: '/add',
  GET_MOVIE_SCREENING_BY_ID: '/:id',
  GET_MOVIES_SCREENING_BY_MOVIE_ID: '/movie/:id',
  GET_MOVIES_SCREENING_BY_SCREEN_ID: '/screen/:id',
  GET_MOVIES_SCREENING_BY_THEATER_ID: '/theater/:id',
};

export default {
  statusApi,
  theaterApi,
};
