import {
  ARTICLES_LOAD_FAILURE,
  ARTICLES_LOAD_REQUEST,
  ARTICLES_LOAD_SUCCEED,
  ArticlesActions,
  ArticlesState,
} from './articles.types';

const initialState: ArticlesState = {
  byKey: {},
};

export const Articles = (state = initialState, action: ArticlesActions): ArticlesState => {
  switch (action.type) {
    case ARTICLES_LOAD_FAILURE:
    case ARTICLES_LOAD_SUCCEED:
    case ARTICLES_LOAD_REQUEST:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
