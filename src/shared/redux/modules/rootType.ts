import { ArticlesState } from './Articles/articles.types';
import { LanguagesState } from './Languages/languages.types';
import { RoutesState } from './Routes/routes.types';
import { SessionState } from './Session/session.types';
import { UiState } from './Ui/ui.types';
import { UsersState } from './Users/users.types';

export type RootState = {
  Articles: ArticlesState;
  Users: UsersState;
  Languages: LanguagesState;
  Routes: RoutesState;
  Ui: UiState;
  Session: SessionState;
};
