import { TextEditorValue } from '@antoniodcorrea/components';
import { UnknownAction } from 'redux';

export const LANGUAGES_LOAD_REQUEST = 'LANGUAGES_LOAD_REQUEST';
export const LANGUAGES_LOAD_SUCCESS = 'LANGUAGES_LOAD_SUCCESS';
export const LANGUAGES_LOAD_FAILURE = 'LANGUAGES_LOAD_FAILURE';
export const LANGUAGES_UPDATE_REQUEST = 'LANGUAGES_UPDATE_REQUEST';
export const LANGUAGES_UPDATE_SUCCESS = 'LANGUAGES_UPDATE_SUCCESS';
export const LANGUAGES_UPDATE_FAILURE = 'LANGUAGES_UPDATE_FAILURE';
export const LANGUAGES_SWITCH_CURRENT_SUCCESS = 'LANGUAGES_SWITCH_CURRENT_SUCCESS';
export const LANGUAGES_SWITCH_CURRENT_REQUEST = 'LANGUAGES_SWITCH_CURRENT_REQUEST';
export const LANGUAGES_SET_LOADING = 'LANGUAGES_SET_LOADING';

export interface GlossaryState {
  siteTitle: string;
  siteDescription: string;
  author: string;
  who: string;
  whoContentJson: TextEditorValue;
  whoContentHtml: string;
  what: string;
  whatSubtitle: string;
  when: string;
  whenSubtitle: string;
  where: string;
  post: string;
  code: string;
  email: string;
  serverError: string;
  control: string;
  notFound: string;
}

export interface LanguageState {
  id: number;
  order: number;
  slug: string;
  name: string;
  isDefault: boolean;
  glossary: GlossaryState;
  links: {
    [key: string]: string;
  };
  isCurrent?: boolean;
}

export type LanguagesState = {
  byKey: {
    [key: string]: LanguageState;
  };
  currentLanguage?: LanguageState;
  errors?: Error[];
  loading?: boolean;
};

export interface LanguagesApiResponseItem extends UnknownAction {
  type: 'languages';
  attributes: LanguageState;
}

export interface LanguagesApiResponse {
  links: {
    [key: string]: string;
  };
  data: LanguagesApiResponseItem[];
}

export interface LanguageApiResponse {
  links: {
    [key: string]: string;
  };
  data: LanguagesApiResponseItem;
}

interface LanguagesLoadRequestAction extends UnknownAction {
  type: typeof LANGUAGES_LOAD_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesLoadSuccessAction extends UnknownAction {
  type: typeof LANGUAGES_LOAD_SUCCESS;
  payload: Partial<LanguagesState>;
}

interface LanguagesLoadFailureAction extends UnknownAction {
  type: typeof LANGUAGES_LOAD_FAILURE;
  payload: Partial<LanguagesState>;
}

interface LanguagesUpdateRequestAction extends UnknownAction {
  type: typeof LANGUAGES_UPDATE_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesUpdateSuccessAction extends UnknownAction {
  type: typeof LANGUAGES_UPDATE_SUCCESS;
  payload: Partial<LanguagesState>;
}

interface LanguagesUpdateFailureAction extends UnknownAction {
  type: typeof LANGUAGES_UPDATE_FAILURE;
  payload: Partial<LanguagesState>;
}

interface LanguagesSwitchCurrentRequestAction extends UnknownAction {
  type: typeof LANGUAGES_SWITCH_CURRENT_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesSwitchCurrentSuccessAction extends UnknownAction {
  type: typeof LANGUAGES_SWITCH_CURRENT_SUCCESS;
  payload: Partial<LanguagesState>;
}

interface LanguagesSetLoadingAction extends UnknownAction {
  type: typeof LANGUAGES_SET_LOADING;
  payload: Partial<LanguagesState>;
}

export type LanguagesActions =
  | LanguagesLoadRequestAction
  | LanguagesLoadSuccessAction
  | LanguagesLoadFailureAction
  | LanguagesUpdateRequestAction
  | LanguagesUpdateSuccessAction
  | LanguagesUpdateFailureAction
  | LanguagesSwitchCurrentRequestAction
  | LanguagesSwitchCurrentSuccessAction
  | LanguagesSetLoadingAction;
