import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { articleCreateOne } from 'Modules/Articles/actions/articleCreateOne';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { ImageUpload } from 'Services/ImageUpload';
import { TextEditorValue } from '@antoniodcorrea/components';
import { ControlArticleCreate as ControlArticleCreateUi } from './ControlArticleCreate';

import './ControlArticleCreate.less';

const ControlArticleCreate: React.FC = () => {
  const dispatch = useDispatch();
  const imageUploadService = new ImageUpload();
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>([]);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {

    const { value } = e.currentTarget;
    console.log('test::value: ', value);

    setTitleValue(value);
    setSubmitError(undefined);
    setTitleError(undefined);
  };

  const onChangeTextEditorValue = (value: TextEditorValue) => {
    console.log('test::value: ', value);
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
      };
      const article = await dispatch(articleCreateOne({ articleData }));
      setSubmitSuccess(true);

      setTimeout(() => history.push(`${Routes.ControlArticle.route}/${article?.id}`), DELAY_SLOW_MS);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ControlArticleCreateUi
      onChangeTitle={onChangeTitle}
      titleValue={titleValue}
      titleError={titleError}
      textEditorDefaultValue={[]}
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
