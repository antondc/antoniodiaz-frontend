import HttpClient from 'Root/src/shared/services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
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
      const projectsWithoutDeletedProject = Object.values(projectsBeforeRequest.byKey).filter(
        (item) => item.id !== projectId
      );

      dispatch({
        type: PROJECT_DELETE_ONE_REQUEST,
        payload: {
          byKey: serializerFromArrayToByKey<ProjectState, ProjectState>({ data: projectsWithoutDeletedProject }),
          currentIds: projectsWithoutDeletedProject.map((item) => item.id),
          loading: true,
        },
      });

      await HttpClient.delete<void, ProjectApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/projects/${projectId}`
      );

      const { Projects: projectsAfterApiCall } = getState();

      dispatch({
        type: PROJECT_DELETE_ONE_SUCCEED,
        payload: {
          ...projectsAfterApiCall,
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
