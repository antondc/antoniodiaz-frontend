import { TextEditorValue } from 'Components/TextEditor';

export const ARTICLES_LOAD_REQUEST = 'ARTICLES_LOAD_REQUEST';
export const ARTICLES_LOAD_SUCCEED = 'ARTICLES_LOAD_SUCCEED';
export const ARTICLES_LOAD_FAILURE = 'ARTICLES_LOAD_FAILURE';
export const ARTICLE_UPDATE_ONE_REQUEST = 'ARTICLE_UPDATE_ONE_REQUEST';
export const ARTICLE_UPDATE_ONE_SUCCEED = 'ARTICLE_UPDATE_ONE_SUCCEED';
export const ARTICLE_UPDATE_ONE_FAILURE = 'ARTICLE_UPDATE_ONE_FAILURE';

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
  createdAt: number;
  updatedAt: number;
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

export interface ArticlesItemResponse {
  type: 'article';
  id: number;
  attributes: ArticleState;
}

export interface ArticlesLoadApiResponse {
  data: ArticlesItemResponse[];
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

export interface ArticlesCreateOneApiResponse {
  data: ArticlesItemResponse;
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

export type ArticlesActions =
  | ArticlesLoadRequestAction
  | ArticlesLoadSuccessAction
  | ArticlesLoadFailureAction
  | ArticleUpdateOneRequestAction
  | ArticleUpdateOneSuccessAction
  | ArticleUpdateOneFailureAction;
