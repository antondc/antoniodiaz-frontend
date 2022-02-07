import { createSelector } from 'reselect';

import { ProjectsState, ProjectState } from './../projects.types';
import { selectProjects } from './selectProjects';

export const selectProjectsAll = createSelector(selectProjects, (Projects: ProjectsState): ProjectState[] =>
  Projects.currentIds.map((id) => Projects.byKey[id])
);
