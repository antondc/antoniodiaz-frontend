import HttpClient from 'Root/src/shared/services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';
import {
  PROJECTS_LOAD_FAILURE,
  PROJECTS_LOAD_REQUEST,
  PROJECTS_LOAD_SUCCEED,
  ProjectsActions,
  ProjectsApiResponse,
  ProjectState,
} from '../projects.types';

export const projectsLoad =
  (): AppThunk<Promise<ProjectState[]>, ProjectsActions> =>
  async (dispatch, getState): Promise<ProjectState[]> => {
    const { Projects: projectsBeforeRequest, Languages: languagesBeforeRequest } = getState();
    try {
      dispatch({
        type: PROJECTS_LOAD_REQUEST,
        payload: {
          ...projectsBeforeRequest,
          loading: true,
        },
      });

      const { meta, data } = await HttpClient.get<void, ProjectsApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/projects${window.location.search}`
      );

      const projectsArray = data?.map((item) => item.attributes);

      const { Projects: projectsAfterApiCall, Languages: languagesAfterRequest } = getState();

      // Filter out projects not matching current language
      const projectsFilteredByCurrentLanguage = Object.values(projectsAfterApiCall.byKey).filter(
        (item) => item.language === languagesAfterRequest.currentLanguage.slug
      );

      dispatch({
        type: PROJECTS_LOAD_SUCCEED,
        payload: {
          ...projectsAfterApiCall,
          byKey: {
            ...serializerFromArrayToByKey<ProjectState, ProjectState>({
              data: projectsFilteredByCurrentLanguage,
            }),
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
