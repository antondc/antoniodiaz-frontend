export const ARTICLES_LOAD_REQUEST = 'ARTICLES_LOAD_REQUEST';
export const ARTICLES_LOAD_SUCCEED = 'ARTICLES_LOAD_SUCCEED';
export const ARTICLES_LOAD_FAILURE = 'PROJECT_LOAD_FAILURE';

export interface ArticleTranslationState {
  title: string;
  htmlContent: string;
}

export interface ArticleState {
  id: number;
  order: number;
  translations: {
    [key: string]: ArticleTranslationState;
  };
}

export interface ArticlesState {
  byKey: {
    [key: string]: ArticleState;
  };
  currentIds?: number[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: Error[];
}

export interface ArticlesLoadApiItemResponse {
  type: 'project';
  id: number;
  attributes: ArticleState;
}

export interface ArticlesLoadApiResponse {
  data: ArticlesLoadApiItemResponse[];
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

interface ArticlesLoadRequestAction {
  type: typeof ARTICLES_LOAD_REQUEST;
  payload: Partial<ArticlesState>;
}

interface ArticlesLoadSuccessAction {
  type: typeof ARTICLES_LOAD_SUCCEED;
  payload: Partial<ArticlesState>;
}

interface ArticlesLoadFailureAction {
  type: typeof ARTICLES_LOAD_FAILURE;
  payload: Partial<ArticlesState>;
}

export type ArticlesActions = ArticlesLoadRequestAction | ArticlesLoadSuccessAction | ArticlesLoadFailureAction;
