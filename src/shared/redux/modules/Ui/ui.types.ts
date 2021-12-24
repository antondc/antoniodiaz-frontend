export const UI_SCREEN_TYPE_SET = 'UI_SCREEN_TYPE_SET';
export const UI_SCREEN_DESKTOP_LOCK = 'UI_SCREEN_DESKTOP_LOCK';
export const UI_SCREEN_DESKTOP_UNLOCK = 'UI_SCREEN_DESKTOP_UNLOCK';
export const UI_SCREEN_MOBILE_LOCK = 'UI_SCREEN_MOBILE_LOCK';
export const UI_SCREEN_MOBILE_UNLOCK = 'UI_SCREEN_MOBILE_UNLOCK';
export const SWITCH_LOGIN_MODAL = 'SWITCH_LOGIN_MODAL';
export const SWITCH_LANGUAGES_MODAL = 'SWITCH_LANGUAGES_MODAL';
export const SWITCH_FORGOT_PASSWORD_MODAL = 'SWITCH_FORGOT_PASSWORD_MODAL';
export const SWITCH_RESET_PASSWORD_MODAL = 'SWITCH_RESET_PASSWORD_MODAL';
export const UI_CLOSE_ALL_MODALS = 'UI_CLOSE_ALL_MODALS';

export type UiBaseModal = {
  type?: 'modal' | 'popup' | 'slider';
  mounted: boolean;
};

export type BookmarkListsModal = {
  bookmarkId?: number;
  loading?: boolean;
} & UiBaseModal;

export type ScreenType = 'desktop' | 'tablet' | 'mobile';

export type UiState = {
  screenType: ScreenType;
  screenMobileLocked: boolean;
  screenLocked: boolean;
  languagesModal: UiBaseModal;
  loginModal: UiBaseModal;
  signUpModal: UiBaseModal;
  forgotPasswordModal: UiBaseModal;
  resetPasswordModal: UiBaseModal;
};

interface UiScreenTypeSet {
  type: typeof UI_SCREEN_TYPE_SET;
  payload: Partial<UiState>;
}

interface UiScreenLock {
  type: typeof UI_SCREEN_DESKTOP_LOCK;
  payload: Partial<UiState>;
}

interface UiScreenUnLock {
  type: typeof UI_SCREEN_DESKTOP_UNLOCK;
  payload: Partial<UiState>;
}

interface UiScreenMobileLock {
  type: typeof UI_SCREEN_MOBILE_LOCK;
  payload: Partial<UiState>;
}

interface UiScreenMobileUnLock {
  type: typeof UI_SCREEN_MOBILE_UNLOCK;
  payload: Partial<UiState>;
}

interface SwitchLanguagesModal {
  type: typeof SWITCH_LANGUAGES_MODAL;
  payload: Partial<UiState>;
}

interface SwitchLoginModal {
  type: typeof SWITCH_LOGIN_MODAL;
  payload: Partial<UiState>;
}

interface SwitchForgotPasswordModal {
  type: typeof SWITCH_FORGOT_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchResetPasswordModal {
  type: typeof SWITCH_RESET_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface UiCloseAllModals {
  type: typeof UI_CLOSE_ALL_MODALS;
  payload: UiState;
}

export type UiActions =
  | UiScreenTypeSet
  | UiScreenLock
  | UiScreenUnLock
  | UiScreenMobileLock
  | UiScreenMobileUnLock
  | SwitchLanguagesModal
  | SwitchLoginModal
  | SwitchForgotPasswordModal
  | SwitchResetPasswordModal
  | UiCloseAllModals;
