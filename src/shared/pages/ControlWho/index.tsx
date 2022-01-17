import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { languagesLoad } from 'Modules/Languages/actions/languagesLoad';
import { languagesUpdateCurrentLanguage } from 'Modules/Languages/actions/languagesUpdateCurrentLanguage';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { ImageUpload } from 'Services/ImageUpload';
import { TextEditorValue } from '@antoniodcorrea/components';
import { ControlWho as ControlWhoUi } from './ControlWho';

const ControlWho: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const glossary = useSelector(selectCurrentGlossary);
  const imageUploadService = new ImageUpload();
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);

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

  useEffect(() => {
    dispatch(languagesLoad());

    setTitleValue(glossary.who);
    setTextEditorValue(glossary.whoContentJson);
  }, [glossary]);

  return (
    <ControlWhoUi
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
export default ControlWho;
