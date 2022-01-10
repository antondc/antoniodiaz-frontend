import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { ProjectsLoadApiResponse, ProjectsState, ProjectState } from './projects.types';
import { projectsMockData } from './projectsMockData';

export const initialProjectsLoader = async (): Promise<{ Projects: ProjectsState }> => {
  // TODO: uncomment when API is ready
  // const { meta, data } = await HttpClient.get<void, ProjectsLoadApiResponse>(`/projects${window.location.search}`);
  const mockPromise: Promise<ProjectsLoadApiResponse> = new Promise((resolve) => {
    resolve(projectsMockData);
  });
  const { meta, data } = await mockPromise;
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
