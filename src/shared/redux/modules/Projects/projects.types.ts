import { TextEditorValue } from '@antoniodcorrea/components';

export const PROJECTS_LOAD_REQUEST = 'PROJECTS_LOAD_REQUEST';
export const PROJECTS_LOAD_SUCCEED = 'PROJECTS_LOAD_SUCCEED';
export const PROJECTS_LOAD_FAILURE = 'PROJECTS_LOAD_FAILURE';
export const PROJECT_UPDATE_ONE_REQUEST = 'PROJECT_UPDATE_ONE_REQUEST';
export const PROJECT_UPDATE_ONE_SUCCEED = 'PROJECT_UPDATE_ONE_SUCCEED';
export const PROJECT_UPDATE_ONE_FAILURE = 'PROJECT_UPDATE_ONE_FAILURE';
export const PROJECT_CREATE_ONE_REQUEST = 'PROJECT_CREATE_ONE_REQUEST';
export const PROJECT_CREATE_ONE_SUCCEED = 'PROJECT_CREATE_ONE_SUCCEED';
export const PROJECT_CREATE_ONE_FAILURE = 'PROJECT_CREATE_ONE_FAILURE';
export const PROJECT_TRANSLATION_CREATE_ONE_REQUEST = 'PROJECT_TRANSLATION_CREATE_ONE_REQUEST';
export const PROJECT_TRANSLATION_CREATE_ONE_SUCCEED = 'PROJECT_TRANSLATION_CREATE_ONE_SUCCEED';
export const PROJECT_TRANSLATION_CREATE_ONE_FAILURE = 'PROJECT_TRANSLATION_CREATE_ONE_FAILURE';
export const PROJECT_SORT_ONE_REQUEST = 'PROJECT_SORT_ONE_REQUEST';
export const PROJECT_SORT_ONE_SUCCEED = 'PROJECT_SORT_ONE_SUCCEED';
export const PROJECT_SORT_ONE_FAILURE = 'PROJECT_SORT_ONE_FAILURE';
export const PROJECTS_PAGE_LOAD_REQUEST = 'PROJECTS_PAGE_LOAD_REQUEST';
export const PROJECTS_PAGE_LOAD_SUCCEED = 'PROJECTS_PAGE_LOAD_SUCCEED';
export const PROJECTS_PAGE_LOAD_FAILURE = 'PROJECTS_PAGE_LOAD_FAILURE';
export const PROJECTS_PAGE_UPLOAD_REQUEST = 'PROJECTS_PAGE_UPLOAD_REQUEST';
export const PROJECTS_PAGE_UPLOAD_SUCCEED = 'PROJECTS_PAGE_UPLOAD_SUCCEED';
export const PROJECTS_PAGE_UPLOAD_FAILURE = 'PROJECTS_PAGE_UPLOAD_FAILURE';

export interface ProjectTranslationState {
  title: string;
  htmlContent: string;
}

type Slide = {
  id: number;
  order: number;
  title: string;
  images: {
    original: string;
    [key: string]: string;
  };
};

export interface ProjectState {
  id: number;
  order: number;
  title: string;
  carousel: Slide[];
  contentJson: TextEditorValue;
  contentHtml: string;
  published: boolean;
  userId: string;
  language: string;
  createdAt: number;
  updatedAt: number;
}

export interface ProjectsState {
  byKey: {
    [key: string]: ProjectState;
  };
  currentIds?: number[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: Error[];
}

export interface ProjectItemResponse {
  type: 'project';
  id: number;
  attributes: ProjectState;
}

export interface ProjectsApiResponse {
  data: ProjectItemResponse[];
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

export interface ProjectApiResponse {
  data: ProjectItemResponse;
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

interface ProjectsLoadRequestAction {
  type: typeof PROJECTS_LOAD_REQUEST;
  payload: Partial<ProjectsState>;
}

interface ProjectsLoadSuccessAction {
  type: typeof PROJECTS_LOAD_SUCCEED;
  payload: Partial<ProjectsState>;
}

interface ProjectsLoadFailureAction {
  type: typeof PROJECTS_LOAD_FAILURE;
  payload: Partial<ProjectsState>;
}

interface ProjectUpdateOneRequestAction {
  type: typeof PROJECT_UPDATE_ONE_REQUEST;
  payload: Partial<ProjectsState>;
}

interface ProjectUpdateOneSuccessAction {
  type: typeof PROJECT_UPDATE_ONE_SUCCEED;
  payload: Partial<ProjectsState>;
}

interface ProjectUpdateOneFailureAction {
  type: typeof PROJECT_UPDATE_ONE_FAILURE;
  payload: Partial<ProjectsState>;
}

interface ProjectCreateOneRequestAction {
  type: typeof PROJECT_CREATE_ONE_REQUEST;
  payload: Partial<ProjectsState>;
}

interface ProjectCreateOneSuccessAction {
  type: typeof PROJECT_CREATE_ONE_SUCCEED;
  payload: Partial<ProjectsState>;
}

interface ProjectCreateOneFailureAction {
  type: typeof PROJECT_CREATE_ONE_FAILURE;
  payload: Partial<ProjectsState>;
}

interface ProjectTranslationCreateOneRequestAction {
  type: typeof PROJECT_TRANSLATION_CREATE_ONE_REQUEST;
  payload: Partial<ProjectsState>;
}

interface ProjectTranslationCreateOneSuccessAction {
  type: typeof PROJECT_TRANSLATION_CREATE_ONE_SUCCEED;
  payload: Partial<ProjectsState>;
}

interface ProjectTranslationCreateOneFailureAction {
  type: typeof PROJECT_TRANSLATION_CREATE_ONE_FAILURE;
  payload: Partial<ProjectsState>;
}

interface ProjectSortOneRequestAction {
  type: typeof PROJECT_SORT_ONE_REQUEST;
  payload: Partial<ProjectsState>;
}

interface ProjectSortOneSuccessAction {
  type: typeof PROJECT_SORT_ONE_SUCCEED;
  payload: Partial<ProjectsState>;
}

interface ProjectSortOneFailureAction {
  type: typeof PROJECT_SORT_ONE_FAILURE;
  payload: Partial<ProjectsState>;
}

interface ProjectsPageLoadRequestAction {
  type: typeof PROJECTS_PAGE_LOAD_REQUEST;
  payload: Partial<ProjectsState>;
}

interface ProjectsPageLoadSuccessAction {
  type: typeof PROJECTS_PAGE_LOAD_SUCCEED;
  payload: Partial<ProjectsState>;
}

interface ProjectsPageLoadFailureAction {
  type: typeof PROJECTS_PAGE_LOAD_FAILURE;
  payload: Partial<ProjectsState>;
}

interface ProjectsPageUpdateRequestAction {
  type: typeof PROJECTS_PAGE_UPLOAD_REQUEST;
  payload: Partial<ProjectsState>;
}

interface ProjectsPageUpdateSuccessAction {
  type: typeof PROJECTS_PAGE_UPLOAD_SUCCEED;
  payload: Partial<ProjectsState>;
}

interface ProjectsPageUpdateFailureAction {
  type: typeof PROJECTS_PAGE_UPLOAD_FAILURE;
  payload: Partial<ProjectsState>;
}

export type ProjectsActions =
  | ProjectsLoadRequestAction
  | ProjectsLoadSuccessAction
  | ProjectsLoadFailureAction
  | ProjectUpdateOneRequestAction
  | ProjectUpdateOneSuccessAction
  | ProjectUpdateOneFailureAction
  | ProjectCreateOneRequestAction
  | ProjectCreateOneSuccessAction
  | ProjectCreateOneFailureAction
  | ProjectTranslationCreateOneRequestAction
  | ProjectTranslationCreateOneSuccessAction
  | ProjectTranslationCreateOneFailureAction
  | ProjectSortOneRequestAction
  | ProjectSortOneSuccessAction
  | ProjectSortOneFailureAction
  | ProjectsPageLoadRequestAction
  | ProjectsPageLoadSuccessAction
  | ProjectsPageLoadFailureAction
  | ProjectsPageUpdateRequestAction
  | ProjectsPageUpdateSuccessAction
  | ProjectsPageUpdateFailureAction;
