import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { projectCreateOne } from 'Modules/Projects/actions/projectCreateOne';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { ImageUpload } from 'Services/ImageUpload';
import { textEditorDefaultValue, TextEditorValue } from '@antoniodcorrea/components';
import { ControlProjectCreate as ControlWhenUi } from './ControlProjectCreate';

import './ControlProjectCreate.less';

const ControlProjectCreate: React.FC = () => {
  const dispatch = useDispatch();
  const imageUploadService = new ImageUpload();
  const language = useSelector(selectCurrentLanguageSlug);
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>(textEditorDefaultValue);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setTitleValue(value);
    setSubmitError(undefined);
    setTitleError(undefined);
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
      const projectData = {
        title: titleValue,
        contentJson: textEditorValue,
      };
      const project = await dispatch(projectCreateOne({ projectData }));
      setSubmitSuccess(true);

      setTimeout(() => history.push(`/${language}/control/when/${project?.id}`), DELAY_SLOW_MS);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ControlWhenUi
      onChangeTitle={onChangeTitle}
      titleValue={titleValue}
      titleError={titleError}
      textEditorDefaultValue={textEditorDefaultValue}
      onChangeTextEditorValue={onChangeTextEditorValue}
      imageUploadService={imageUploadService}
      onSubmit={onSubmit}
      submitError={submitError}
      submitting={submitting}
      submitSuccess={submitSuccess}
    />
  );
};

export default ControlProjectCreate;
