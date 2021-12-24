import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import {
  PROJECTS_LOAD_FAILURE,
  PROJECTS_LOAD_REQUEST,
  PROJECTS_LOAD_SUCCEED,
  ProjectsActions,
  ProjectsLoadApiResponse,
  ProjectState,
} from '../projects.types';
import { projectsMockData } from '../projectsMockData';

export const projectsLoad =
  (): AppThunk<Promise<ProjectState[]>, ProjectsActions> =>
  async (dispatch, getState): Promise<ProjectState[]> => {
    const { Projects: projectsBeforeRequest } = getState();

    try {
      dispatch({
        type: PROJECTS_LOAD_REQUEST,
        payload: {
          ...projectsBeforeRequest,
          loading: true,
        },
      });

      // TODO: uncomment when API is ready
      // const { meta, data } = await HttpClient.get<void, ProjectsLoadApiResponse>(`/projects${window.location.search}`);
      const mockPromise: Promise<ProjectsLoadApiResponse> = new Promise((resolve) => {
        resolve(projectsMockData);
      });
      const { meta, data } = await mockPromise;

      const projectsArray = data?.map((item) => item.attributes);

      const { Projects: projectsAfterApiCall } = getState();

      dispatch({
        type: PROJECTS_LOAD_SUCCEED,
        payload: {
          ...projectsAfterApiCall,
          byKey: {
            ...projectsAfterApiCall.byKey,
            ...serializerFromArrayToByKey<ProjectState, ProjectState>({
              data: projectsArray,
            }),
          },
          currentIds: data?.map((item) => item.id),
          meta,
          loading: false,
        },
      });

      return projectsArray;
    } catch (error) {
      const { Projects: projectsOnError } = getState();

      dispatch({
        type: PROJECTS_LOAD_FAILURE,
        payload: {
          ...projectsOnError,
          errors: [...(projectsOnError.errors || []), error],
        },
      });
    }
  };
