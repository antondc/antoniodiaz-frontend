export const PROJECTS_LOAD_REQUEST = 'PROJECTS_LOAD_REQUEST';
export const PROJECTS_LOAD_SUCCEED = 'PROJECTS_LOAD_SUCCEED';
export const PROJECTS_LOAD_FAILURE = 'PROJECT_LOAD_FAILURE';

export interface ProjectState {
  id: number;
  order: number;
  image: {
    original: string;
    [key: string]: string;
  };
  translations: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
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

export interface ProjectsLoadApiItemResponse {
  type: 'project';
  id: number;
  attributes: ProjectState;
}

export interface ProjectsLoadApiResponse {
  data: ProjectsLoadApiItemResponse[];
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

export type ProjectsActions = ProjectsLoadRequestAction | ProjectsLoadSuccessAction | ProjectsLoadFailureAction;
