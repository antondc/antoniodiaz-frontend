import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  PROJECT_UPDATE_ONE_FAILURE,
  PROJECT_UPDATE_ONE_REQUEST,
  PROJECT_UPDATE_ONE_SUCCEED,
  ProjectApiResponse,
  ProjectsActions,
  ProjectState,
} from '../projects.types';

type Params = {
  projectId: number;
  projectData: Partial<ProjectState>;
};

export const projectUpdateOne =
  ({ projectId, projectData }: Params): AppThunk<Promise<ProjectState>, ProjectsActions> =>
  async (dispatch, getState): Promise<ProjectState> => {
    const { Projects: projectsBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: PROJECT_UPDATE_ONE_REQUEST,
        payload: {
          ...projectsBeforeRequest,
          byKey: {
            ...projectsBeforeRequest.byKey,
            [projectId]: {
              ...projectsBeforeRequest.byKey[projectId],
              ...projectData,
            },
          },
          saving: true,
        },
      });

      const { data } = await HttpClient.put<void, ProjectApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/projects/${projectId}`,
        projectData
      );

      const { Projects: projectsAfterApiCall } = getState();
      const project = data?.attributes;

      dispatch({
        type: PROJECT_UPDATE_ONE_SUCCEED,
        payload: {
          ...projectsAfterApiCall,
          byKey: {
            ...projectsAfterApiCall.byKey,
            [projectId]: project,
          },
          saving: false,
        },
      });

      return project;
    } catch (error) {
      const { Projects: projectsOnError } = getState();

      dispatch({
        type: PROJECT_UPDATE_ONE_FAILURE,
        payload: {
          ...projectsOnError,
          errors: [...(projectsOnError.errors || []), error],
          loading: false,
          saving: false,
        },
      });
    }
  };
