import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { languagesLoad } from 'Modules/Languages/actions/languagesLoad';
import { languagesUpdateCurrentLanguage } from 'Modules/Languages/actions/languagesUpdateCurrentLanguage';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { ImageUpload } from 'Services/ImageUpload';
import { TextEditorValue } from '@antoniodcorrea/components';
import { ControlAbout as ControlAboutUi } from './ControlAbout';

const ControlAbout: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const imageUploadService = new ImageUpload();
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>([]);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);

  const loadInitialData = async () => {
    await dispatch(languagesLoad());
    setTitleValue(glossary.who);
    setTextEditorValue(glossary.whoContentJson);
  };
  useLoadInitialData({ loadInitialData });

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setTitleValue(value);
    setSubmitError(undefined);
    setTitleError(undefined);
    setSubmitSuccess(undefined);
  };

  const onChangeTextEditorValue = (value: TextEditorValue) => {
    setSubmitError(undefined);
    setSubmitting(undefined);
    setSubmitSuccess(undefined);

    setTextEditorValue(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const glossaryData = {
        who: titleValue,
        whoContentJson: textEditorValue,
      };
      dispatch(languagesUpdateCurrentLanguage(glossaryData));

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ControlAboutUi
      titleValue={titleValue}
      onChangeTitle={onChangeTitle}
      titleError={titleError}
      textEditorInitialValue={textEditorValue}
      onChangeTextEditorValue={onChangeTextEditorValue}
      imageUploadService={imageUploadService}
      onSubmit={onSubmit}
      submitError={submitError}
      submitSuccess={submitSuccess}
      submitting={submitting}
    />
  );
};
export default ControlAbout;
