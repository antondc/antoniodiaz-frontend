import { createSelector } from 'reselect';

import { ProjectsState, ProjectState } from './../projects.types';
import { selectProjects } from './selectProjects';

export const selectProjectsCurrent = createSelector(selectProjects, (Projects: ProjectsState): ProjectState[] =>
  Projects.currentIds?.map((item) => Projects.byKey[item])
);
