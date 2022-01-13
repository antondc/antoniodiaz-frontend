import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  PROJECT_SORT_ONE_FAILURE,
  PROJECT_SORT_ONE_REQUEST,
  PROJECT_SORT_ONE_SUCCEED,
  ProjectApiResponse,
  ProjectsActions,
  ProjectState,
} from '../projects.types';

type Params = {
  projectId: number;
  order: number;
};

export const projectSortOne =
  ({ projectId, order }: Params): AppThunk<Promise<ProjectState>, ProjectsActions> =>
  async (dispatch, getState): Promise<ProjectState> => {
    const { Projects: projectsBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: PROJECT_SORT_ONE_REQUEST,
        payload: {
          ...projectsBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.patch<void, ProjectApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/projects/${projectId}`,
        { order }
      );

      const { Projects: projectsAfterApiCall } = getState();
      const project = data?.attributes;

      dispatch({
        type: PROJECT_SORT_ONE_SUCCEED,
        payload: {
          ...projectsAfterApiCall,
          loading: false,
        },
      });

      return project;
    } catch (error) {
      const { Projects: projectsOnError } = getState();

      dispatch({
        type: PROJECT_SORT_ONE_FAILURE,
        payload: {
          ...projectsOnError,
          errors: [...(projectsOnError.errors || []), error],
        },
      });
    }
  };
