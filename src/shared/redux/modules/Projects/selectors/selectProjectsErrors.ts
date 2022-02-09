import { createSelector } from 'reselect';

import { ProjectsState } from '../projects.types';
import { selectProjects } from './selectProjects';

export const selectProjectsErrors = createSelector(
  selectProjects,
  (Projects: ProjectsState): Error[] => Projects?.errors
);
