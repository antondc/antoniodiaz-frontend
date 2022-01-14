import {
  PROJECTS_LOAD_FAILURE,
  PROJECTS_LOAD_REQUEST,
  PROJECTS_LOAD_SUCCEED,
  PROJECTS_PAGE_LOAD_FAILURE,
  PROJECTS_PAGE_LOAD_REQUEST,
  PROJECTS_PAGE_LOAD_SUCCEED,
  PROJECTS_PAGE_UPLOAD_FAILURE,
  PROJECTS_PAGE_UPLOAD_REQUEST,
  PROJECTS_PAGE_UPLOAD_SUCCEED,
  ProjectsActions,
  ProjectsState,
} from './projects.types';

const initialState: ProjectsState = {
  byKey: {},
  currentIds: [],
};

export const Projects = (state = initialState, action: ProjectsActions): ProjectsState => {
  switch (action.type) {
    case PROJECTS_LOAD_FAILURE:
    case PROJECTS_LOAD_SUCCEED:
    case PROJECTS_LOAD_REQUEST:
    case PROJECTS_PAGE_LOAD_REQUEST:
    case PROJECTS_PAGE_LOAD_SUCCEED:
    case PROJECTS_PAGE_LOAD_FAILURE:
    case PROJECTS_PAGE_UPLOAD_REQUEST:
    case PROJECTS_PAGE_UPLOAD_SUCCEED:
    case PROJECTS_PAGE_UPLOAD_FAILURE:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
