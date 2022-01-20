import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  PROJECT_DELETE_ONE_FAILURE,
  PROJECT_DELETE_ONE_REQUEST,
  PROJECT_DELETE_ONE_SUCCEED,
  ProjectApiResponse,
  ProjectsActions,
  ProjectState,
} from '../projects.types';

export const projectDeleteOne =
  (projectId: number): AppThunk<Promise<Partial<ProjectState>>, ProjectsActions> =>
  async (dispatch, getState): Promise<Partial<ProjectState>> => {
    const { Projects: projectsBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: PROJECT_DELETE_ONE_REQUEST,
        payload: {
          ...projectsBeforeRequest,
          loading: true,
        },
      });

      await HttpClient.delete<void, ProjectApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/projects/${projectId}`
      );

      const { Projects: projectsAfterApiCall } = getState();
      const projectIdsWithoutProjectId = projectsAfterApiCall.currentIds.filter((item) => item !== projectId);

      dispatch({
        type: PROJECT_DELETE_ONE_SUCCEED,
        payload: {
          ...projectsAfterApiCall,
          byKey: {
            ...projectsAfterApiCall.byKey,
            [projectId]: undefined,
          },
          currentIds: projectIdsWithoutProjectId,
          loading: false,
        },
      });

      return {
        id: projectId,
      };
    } catch (error) {
      const { Projects: projectsOnError } = getState();

      dispatch({
        type: PROJECT_DELETE_ONE_FAILURE,
        payload: {
          ...projectsOnError,
          errors: [...(projectsOnError.errors || []), error],
        },
      });
    }
  };
