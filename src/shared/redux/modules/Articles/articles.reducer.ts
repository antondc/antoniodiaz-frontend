import {
  ARTICLE_CREATE_ONE_FAILURE,
  ARTICLE_CREATE_ONE_REQUEST,
  ARTICLE_CREATE_ONE_SUCCEED,
  ARTICLE_SORT_ONE_FAILURE,
  ARTICLE_SORT_ONE_REQUEST,
  ARTICLE_SORT_ONE_SUCCEED,
  ARTICLE_UPDATE_ONE_FAILURE,
  ARTICLE_UPDATE_ONE_REQUEST,
  ARTICLE_UPDATE_ONE_SUCCEED,
  ARTICLES_LOAD_FAILURE,
  ARTICLES_LOAD_REQUEST,
  ARTICLES_LOAD_SUCCEED,
  ArticlesActions,
  ArticlesState,
} from './articles.types';

const initialState: ArticlesState = {
  byKey: {},
  currentIds: [],
};

export const Articles = (state = initialState, action: ArticlesActions): ArticlesState => {
  switch (action.type) {
    case ARTICLES_LOAD_FAILURE:
    case ARTICLES_LOAD_SUCCEED:
    case ARTICLES_LOAD_REQUEST:
    case ARTICLE_UPDATE_ONE_REQUEST:
    case ARTICLE_UPDATE_ONE_SUCCEED:
    case ARTICLE_UPDATE_ONE_FAILURE:
    case ARTICLE_CREATE_ONE_REQUEST:
    case ARTICLE_CREATE_ONE_SUCCEED:
    case ARTICLE_CREATE_ONE_FAILURE:
    case ARTICLE_SORT_ONE_REQUEST:
    case ARTICLE_SORT_ONE_SUCCEED:
    case ARTICLE_SORT_ONE_FAILURE:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
