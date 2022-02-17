import { TextEditorValue } from '@antoniodcorrea/components';

export const ARTICLES_LOAD_REQUEST = 'ARTICLES_LOAD_REQUEST';
export const ARTICLES_LOAD_SUCCEED = 'ARTICLES_LOAD_SUCCEED';
export const ARTICLES_LOAD_FAILURE = 'ARTICLES_LOAD_FAILURE';
export const ARTICLE_UPDATE_ONE_REQUEST = 'ARTICLE_UPDATE_ONE_REQUEST';
export const ARTICLE_UPDATE_ONE_SUCCEED = 'ARTICLE_UPDATE_ONE_SUCCEED';
export const ARTICLE_UPDATE_ONE_FAILURE = 'ARTICLE_UPDATE_ONE_FAILURE';
export const ARTICLE_CREATE_ONE_REQUEST = 'ARTICLE_CREATE_ONE_REQUEST';
export const ARTICLE_CREATE_ONE_SUCCEED = 'ARTICLE_CREATE_ONE_SUCCEED';
export const ARTICLE_CREATE_ONE_FAILURE = 'ARTICLE_CREATE_ONE_FAILURE';
export const ARTICLE_SORT_ONE_REQUEST = 'ARTICLE_SORT_ONE_REQUEST';
export const ARTICLE_SORT_ONE_SUCCEED = 'ARTICLE_SORT_ONE_SUCCEED';
export const ARTICLE_SORT_ONE_FAILURE = 'ARTICLE_SORT_ONE_FAILURE';
export const ARTICLE_DELETE_ONE_REQUEST = 'ARTICLE_DELETE_ONE_REQUEST';
export const ARTICLE_DELETE_ONE_SUCCEED = 'ARTICLE_DELETE_ONE_SUCCEED';
export const ARTICLE_DELETE_ONE_FAILURE = 'ARTICLE_DELETE_ONE_FAILURE';

export interface ArticleTranslationState {
  title: string;
  htmlContent: string;
}

export interface ArticleState {
  id: number;
  order: number;
  title: string;
  contentHtml: string;
  contentJson: TextEditorValue;
  published: boolean;
  userId: string;
  language: string;
  date?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ArticlesState {
  byKey: {
    [key: string]: ArticleState;
  };
  currentIds: number[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: Error[];
}

export interface ArticleItemResponse {
  type: 'article';
  id: number;
  attributes: ArticleState;
}

export interface ArticlesApiResponse {
  data: ArticleItemResponse[];
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

export interface ArticleApiResponse {
  data: ArticleItemResponse;
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

interface ArticleUpdateOneRequestAction {
  type: typeof ARTICLE_UPDATE_ONE_REQUEST;
  payload: Partial<ArticlesState>;
}

interface ArticleUpdateOneSuccessAction {
  type: typeof ARTICLE_UPDATE_ONE_SUCCEED;
  payload: Partial<ArticlesState>;
}

interface ArticleUpdateOneFailureAction {
  type: typeof ARTICLE_UPDATE_ONE_FAILURE;
  payload: Partial<ArticlesState>;
}

interface ArticleCreateOneRequestAction {
  type: typeof ARTICLE_CREATE_ONE_REQUEST;
  payload: Partial<ArticlesState>;
}

interface ArticleCreateOneSuccessAction {
  type: typeof ARTICLE_CREATE_ONE_SUCCEED;
  payload: Partial<ArticlesState>;
}

interface ArticleCreateOneFailureAction {
  type: typeof ARTICLE_CREATE_ONE_FAILURE;
  payload: Partial<ArticlesState>;
}

interface ArticleSortOneRequestAction {
  type: typeof ARTICLE_SORT_ONE_REQUEST;
  payload: Partial<ArticlesState>;
}

interface ArticleSortOneSuccessAction {
  type: typeof ARTICLE_SORT_ONE_SUCCEED;
  payload: Partial<ArticlesState>;
}

interface ArticleSortOneFailureAction {
  type: typeof ARTICLE_SORT_ONE_FAILURE;
  payload: Partial<ArticlesState>;
}

interface ArticleDeleteOneRequestAction {
  type: typeof ARTICLE_DELETE_ONE_REQUEST;
  payload: Partial<ArticlesState>;
}

interface ArticleDeleteOneSuccessAction {
  type: typeof ARTICLE_DELETE_ONE_SUCCEED;
  payload: Partial<ArticlesState>;
}

interface ArticleDeleteOneFailureAction {
  type: typeof ARTICLE_DELETE_ONE_FAILURE;
  payload: Partial<ArticlesState>;
}

export type ArticlesActions =
  | ArticlesLoadRequestAction
  | ArticlesLoadSuccessAction
  | ArticlesLoadFailureAction
  | ArticleUpdateOneRequestAction
  | ArticleUpdateOneSuccessAction
  | ArticleUpdateOneFailureAction
  | ArticleCreateOneRequestAction
  | ArticleCreateOneSuccessAction
  | ArticleCreateOneFailureAction
  | ArticleSortOneRequestAction
  | ArticleSortOneSuccessAction
  | ArticleSortOneFailureAction
  | ArticleDeleteOneRequestAction
  | ArticleDeleteOneSuccessAction
  | ArticleDeleteOneFailureAction;
