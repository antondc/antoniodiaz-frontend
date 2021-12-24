import { LanguagesState } from './Languages/languages.types';
import { ProjectsState } from './Projects/projects.types';
import { RoutesState } from './Routes/routes.types';
import { SessionState } from './Session/session.types';
import { UiState } from './Ui/ui.types';
import { UsersState } from './Users/users.types';

export type RootState = {
  Projects: ProjectsState;
  Users: UsersState;
  Languages: LanguagesState;
  Routes: RoutesState;
  Ui: UiState;
  Session: SessionState;
};
