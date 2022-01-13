import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { ProjectsApiResponse, ProjectsState, ProjectState } from './projects.types';

export const initialProjectsLoader = async ({ params }: RequestParameters): Promise<{ Projects: ProjectsState }> => {
  const lang = params?.lang ? `/${params?.lang}` : '';
  const { data, meta }: ProjectsApiResponse = await HttpClient.get(`${lang}/projects`);

  const projectsArray = data?.map((item) => item.attributes);

  const result = {
    Projects: {
      byKey: {
        ...serializerFromArrayToByKey<ProjectState, ProjectState>({
          data: projectsArray,
        }),
      },
      currentIds: data?.map((item) => item.id),
      meta,
    },
  };

  return result;
};
