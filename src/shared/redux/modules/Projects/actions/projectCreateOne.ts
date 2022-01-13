import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  PROJECT_CREATE_ONE_FAILURE,
  PROJECT_CREATE_ONE_REQUEST,
  PROJECT_CREATE_ONE_SUCCEED,
  ProjectApiResponse,
  ProjectsActions,
  ProjectState,
} from '../projects.types';

type Params = {
  projectData: Partial<ProjectState>;
};

export const projectCreateOne =
  ({ projectData }: Params): AppThunk<Promise<ProjectState>, ProjectsActions> =>
  async (dispatch, getState): Promise<ProjectState> => {
    const { Projects: projectsBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: PROJECT_CREATE_ONE_REQUEST,
        payload: {
          ...projectsBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.post<void, ProjectApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/projects/`,
        projectData
      );

      const { Projects: projectsAfterApiCall } = getState();
      const project = data?.attributes;

      dispatch({
        type: PROJECT_CREATE_ONE_SUCCEED,
        payload: {
          ...projectsAfterApiCall,
          byKey: {
            ...projectsAfterApiCall.byKey,
            [project?.id]: {
              ...project,
            },
          },
          loading: false,
        },
      });

      return project;
    } catch (error) {
      const { Projects: projectsOnError } = getState();

      dispatch({
        type: PROJECT_CREATE_ONE_FAILURE,
        payload: {
          ...projectsOnError,
          errors: [...(projectsOnError.errors || []), error],
        },
      });
    }
  };
