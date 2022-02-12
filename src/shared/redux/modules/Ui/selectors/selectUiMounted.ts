import { RootState } from '../../rootType';

export const selectUiMounted = (state: RootState): boolean => state.Ui?.mounted;
