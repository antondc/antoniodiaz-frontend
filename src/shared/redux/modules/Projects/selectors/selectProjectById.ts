import { RootState } from 'Modules/rootType';
import { ProjectState } from '../projects.types';

export const selectProjectById = (state: RootState, projectId: number): ProjectState => state.Projects.byKey[projectId];
