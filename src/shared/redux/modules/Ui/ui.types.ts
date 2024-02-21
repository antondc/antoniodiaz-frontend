import { UnknownAction } from 'redux';

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
export const UI_SWITCH_MOUNTED = 'UI_SWITCH_MOUNTED';

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
  mounted: boolean;
  screenType: ScreenType;
  screenMobileLocked: boolean;
  screenLocked: boolean;
  loginModal: UiBaseModal;
  signUpModal: UiBaseModal;
  forgotPasswordModal: UiBaseModal;
  resetPasswordModal: UiBaseModal;
};

interface UiScreenTypeSet extends UnknownAction {
  type: typeof UI_SCREEN_TYPE_SET;
  payload: Partial<UiState>;
}

interface UiScreenLock extends UnknownAction {
  type: typeof UI_SCREEN_DESKTOP_LOCK;
  payload: Partial<UiState>;
}

interface UiScreenUnLock extends UnknownAction {
  type: typeof UI_SCREEN_DESKTOP_UNLOCK;
  payload: Partial<UiState>;
}

interface UiScreenMobileLock extends UnknownAction {
  type: typeof UI_SCREEN_MOBILE_LOCK;
  payload: Partial<UiState>;
}

interface UiScreenMobileUnLock extends UnknownAction {
  type: typeof UI_SCREEN_MOBILE_UNLOCK;
  payload: Partial<UiState>;
}

interface SwitchLanguagesModal extends UnknownAction {
  type: typeof SWITCH_LANGUAGES_MODAL;
  payload: Partial<UiState>;
}

interface SwitchLoginModal extends UnknownAction {
  type: typeof SWITCH_LOGIN_MODAL;
  payload: Partial<UiState>;
}

interface SwitchForgotPasswordModal extends UnknownAction {
  type: typeof SWITCH_FORGOT_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchResetPasswordModal extends UnknownAction {
  type: typeof SWITCH_RESET_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface UiCloseAllModals extends UnknownAction {
  type: typeof UI_CLOSE_ALL_MODALS;
  payload: UiState;
}

interface UiSwitchMounted extends UnknownAction {
  type: typeof UI_SWITCH_MOUNTED;
  payload: Partial<UiState>;
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
  | UiCloseAllModals
  | UiSwitchMounted;
