import { TextEditorValue } from '@antoniodcorrea/components';

export const LANGUAGES_LOAD_REQUEST = 'LANGUAGES_LOAD_REQUEST';
export const LANGUAGES_LOAD_SUCCESS = 'LANGUAGES_LOAD_SUCCESS';
export const LANGUAGES_LOAD_FAILURE = 'LANGUAGES_LOAD_FAILURE';
export const LANGUAGES_UPDATE_REQUEST = 'LANGUAGES_UPDATE_REQUEST';
export const LANGUAGES_UPDATE_SUCCESS = 'LANGUAGES_UPDATE_SUCCESS';
export const LANGUAGES_UPDATE_FAILURE = 'LANGUAGES_UPDATE_FAILURE';
export const LANGUAGES_SWITCH_CURRENT_SUCCESS = 'LANGUAGES_SWITCH_CURRENT_SUCCESS';
export const LANGUAGES_SWITCH_CURRENT_REQUEST = 'LANGUAGES_SWITCH_CURRENT_REQUEST';

export interface GlossaryState {
  who: string;
  whoContentJson: TextEditorValue;
  whoHtmlText: string;
  what: string;
  whatSubtitle: string;
  when: string;
  where: string;
  post: string;
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
  loading?: boolean;
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
};

export interface LanguagesApiResponseItem {
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

interface LanguagesLoadRequestAction {
  type: typeof LANGUAGES_LOAD_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesLoadSuccessAction {
  type: typeof LANGUAGES_LOAD_SUCCESS;
  payload: Partial<LanguagesState>;
}

interface LanguagesLoadFailureAction {
  type: typeof LANGUAGES_LOAD_FAILURE;
  payload: Partial<LanguagesState>;
}

interface LanguagesUpdateRequestAction {
  type: typeof LANGUAGES_UPDATE_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesUpdateSuccessAction {
  type: typeof LANGUAGES_UPDATE_SUCCESS;
  payload: Partial<LanguagesState>;
}

interface LanguagesUpdateFailureAction {
  type: typeof LANGUAGES_UPDATE_FAILURE;
  payload: Partial<LanguagesState>;
}

interface LanguagesSwitchCurrentRequestAction {
  type: typeof LANGUAGES_SWITCH_CURRENT_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesSwitchCurrentSuccessAction {
  type: typeof LANGUAGES_SWITCH_CURRENT_SUCCESS;
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
  | LanguagesSwitchCurrentSuccessAction;
