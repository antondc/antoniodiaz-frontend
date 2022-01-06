import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { ImageUpload } from 'Services/ImageUpload';
import { mockApiCall } from 'Tools/utils/async/mockApiCall';
import { TextEditorValue } from '../../components/TextEditor';
import { ControlWhat as ControlWhatUi } from './ControlWhat';

import './ControlWhat.less';

const ControlWhat: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);
  const imageUpload = new ImageUpload();

  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);

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
      await mockApiCall(false, 2000);

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ControlWhatUi
      glossary={glossary}
      textEditorValue={textEditorValue}
      onChangeTextEditorValue={onChangeTextEditorValue}
      imageUpload={imageUpload}
      onSubmit={onSubmit}
      submitError={submitError}
      submitting={submitting}
      submitSuccess={submitSuccess}
    />
  );
};

export default ControlWhat;
