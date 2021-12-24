import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { ProjectsLoadApiResponse, ProjectsState, ProjectState } from './projects.types';

export const initialProjectsLoader = async (): Promise<{ Projects: ProjectsState }> => {
  const { data }: ProjectsLoadApiResponse = await HttpClient.get(`/projects${window.location.search}`);
  const projectsArray = data?.map((item) => item.attributes);

  const result = {
    Projects: {
      byKey: {
        ...serializerFromArrayToByKey<ProjectState, ProjectState>({
          data: projectsArray,
        }),
      },
    },
  };

  return result;
};
