import {
  SWITCH_FORGOT_PASSWORD_MODAL,
  SWITCH_LANGUAGES_MODAL,
  SWITCH_LOGIN_MODAL,
  SWITCH_RESET_PASSWORD_MODAL,
  UI_CLOSE_ALL_MODALS,
  UI_SCREEN_DESKTOP_LOCK,
  UI_SCREEN_DESKTOP_UNLOCK,
  UI_SCREEN_MOBILE_LOCK,
  UI_SCREEN_MOBILE_UNLOCK,
  UI_SCREEN_TYPE_SET,
  UI_SWITCH_MOUNTED,
  UiActions,
  UiState,
} from './ui.types';

export const initialState: UiState = {
  mounted: true,
  screenType: 'desktop',
  screenLocked: false,
  screenMobileLocked: false,
  languagesModal: {
    type: 'modal',
    mounted: false,
  },
  loginModal: {
    type: 'popup',
    mounted: false,
  },
  signUpModal: {
    type: 'popup',
    mounted: false,
  },
  forgotPasswordModal: {
    type: 'popup',
    mounted: false,
  },
  resetPasswordModal: {
    type: 'popup',
    mounted: false,
  },
};

export const Ui = (state = initialState, action: UiActions): UiState => {
  switch (action.type) {
    case UI_SCREEN_TYPE_SET:
    case UI_SCREEN_DESKTOP_LOCK:
    case UI_SCREEN_DESKTOP_UNLOCK:
    case UI_SCREEN_MOBILE_LOCK:
    case UI_SCREEN_MOBILE_UNLOCK:
    case SWITCH_LANGUAGES_MODAL:
    case SWITCH_LOGIN_MODAL:
    case SWITCH_FORGOT_PASSWORD_MODAL:
    case SWITCH_RESET_PASSWORD_MODAL:
    case UI_CLOSE_ALL_MODALS:
    case UI_SWITCH_MOUNTED:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
