import { createSelector } from 'reselect';

import { ProjectsState } from '../projects.types';
import { selectProjects } from './selectProjects';

export const selectProjectSaving = createSelector(
  selectProjects,
  (Projects: ProjectsState): boolean => Projects?.saving
);
