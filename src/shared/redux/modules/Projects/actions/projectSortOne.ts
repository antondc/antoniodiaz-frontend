import HttpClient from 'Root/src/shared/services/HttpClient';
import { serializerFromArrayToByKey, sortArrayByIdAndOrder } from '@antoniodcorrea/utils';
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
    if (!projectId) return;

    const { Projects: projectsBeforeRequest, Languages: languagesBeforeRequest } = getState();

    const sorted = sortArrayByIdAndOrder<Array<ProjectState>>({
      data: Object.values(projectsBeforeRequest.byKey),
      id: projectId,
      order,
    });
    const sortedIds = sorted.map((item) => item.id);

    try {
      dispatch({
        type: PROJECT_SORT_ONE_REQUEST,
        payload: {
          ...projectsBeforeRequest,
          byKey: serializerFromArrayToByKey<ProjectState, ProjectState>({
            data: sorted,
          }),
          loading: true,
          currentIds: sortedIds,
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
