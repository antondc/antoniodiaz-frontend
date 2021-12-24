import { RootState } from 'Modules/rootType';
import { ProjectsState } from '../projects.types';

export const selectProjects = (state: RootState): ProjectsState => state.Projects;
