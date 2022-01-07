import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { textEditorDefaultValue, TextEditorValue } from 'Components/TextEditor';
import { articleCreateOne } from 'Modules/Articles/actions/articleCreateOne';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { ImageUpload } from 'Services/ImageUpload';
import { ControlArticleCreate as ControlWhenUi } from './ControlArticleCreate';

import './ControlArticleCreate.less';

const ControlArticleCreate: React.FC = () => {
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
      const articleData = {
        title: titleValue,
        contentJson: textEditorValue,
        contentHtml: '<div />',
      };
      const article = await dispatch(articleCreateOne({ articleData }));
      setSubmitSuccess(true);

      setTimeout(() => history.push(`/${language}/control/when/${article?.id}`), DELAY_SLOW_MS);
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

export default ControlArticleCreate;
