import { UI_SWITCH_MOUNTED, UiActions } from '../ui.types';

export const uiSwitchMounted = (mounted: boolean): UiActions => ({
  type: UI_SWITCH_MOUNTED,
  payload: {
    mounted,
  },
});
