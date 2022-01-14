import { RootState } from 'Modules/rootType';
import { ProjectState } from '../projects.types';

export const selectProject = (state: RootState, projectId: number): ProjectState => state.Projects.byKey[projectId];
