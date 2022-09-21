import { Articles } from './modules/Articles/articles.reducer';
import { Languages } from './modules/Languages/languages.reducer';
import { Routes } from './modules/Routes/routes.reducer';
import { Session } from './modules/Session/session.reducer';
import { Ui } from './modules/Ui/ui.reducer';
import { Users } from './modules/Users/users.reducer';

export const RootReducers = {
  Articles,
  Users,
  Languages,
  Routes,
  Session,
  Ui,
};
