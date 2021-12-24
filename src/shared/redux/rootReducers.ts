import { Languages } from './modules/Languages/languages.reducer';
import { Projects } from './modules/Projects/projects.reducer';
import { Routes } from './modules/Routes/routes.reducer';
import { Session } from './modules/Session/session.reducer';
import { Ui } from './modules/Ui/ui.reducer';
import { Users } from './modules/Users/users.reducer';

export const RootReducers = {
  Projects,
  Users,
  Languages,
  Routes,
  Session,
  Ui,
};
