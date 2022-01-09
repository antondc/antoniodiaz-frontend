import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { articleUpdateOne } from 'Modules/Articles/actions/articleUpdateOne';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamArticleId } from 'Modules/Routes/selectors/selectCurrentRouteParamArticleId';
import { ImageUpload } from 'Services/ImageUpload';
import { TextEditorValue } from '@antoniodcorrea/components';
import { ControlArticle as ControlWhenUi } from './ControlArticle';

import './ControlArticle.less';

const ControlArticle: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const imageUploadService = new ImageUpload();
  const articleId = useSelector(selectCurrentRouteParamArticleId);
  const article = useSelector((state: RootState) => selectArticle(state, Number(articleId)));
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>(undefined);
  const [publishError, setPublishError] = useState<string>(undefined);
  const [publishing, setPublishing] = useState<boolean>(undefined);
  const [publishSuccess, setPublishingSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [publishedValue, setPublishedValue] = useState<boolean>(undefined);

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setTitleValue(value);
    setSubmitError(undefined);
    setTitleError(undefined);
    setPublishError(undefined);
    setPublishingSuccess(undefined);
    setSubmitSuccess(undefined);
  };

  const onChangeTextEditorValue = (value: TextEditorValue) => {
    setSubmitError(undefined);
    setSubmitting(undefined);
    setSubmitSuccess(undefined);
    setPublishError(undefined);
    setPublishing(undefined);
    setPublishingSuccess(undefined);

    setTextEditorValue(value);
  };

  const onChangePublish = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPublishing(true);

    try {
      const articleData = {
        ...article,
        published: !publishedValue,
      };
      dispatch(articleUpdateOne({ articleId: Number(articleId), articleData }));

      setPublishingSuccess(true);
    } catch (error) {
      setPublishError(error.message);
    } finally {
      setPublishing(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const articleData = {
        ...article,
        title: titleValue,
        contentJson: textEditorValue,
      };
      dispatch(articleUpdateOne({ articleId: Number(articleId), articleData }));

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(articlesLoad());
  }, [language]);

  useEffect(() => {
    setPublishedValue(!!article?.published);
    setTitleValue(article?.title);

    const textFormData = article?.contentJson;
    setTextEditorValue(textFormData);
  }, [article]);

  return (
    <ControlWhenUi
      titleValue={titleValue}
      titleError={titleError}
      onChangeTitle={onChangeTitle}
      textEditorInitialValue={article?.contentJson}
      onChangeTextEditorValue={onChangeTextEditorValue}
      imageUploadService={imageUploadService}
      onChangePublish={onChangePublish}
      publishError={publishError}
      publishing={publishing}
      publishSuccess={publishSuccess}
      onSubmit={onSubmit}
      submitError={submitError}
      submitting={submitting}
      submitSuccess={submitSuccess}
      publishedValue={publishedValue}
    />
  );
};

export default ControlArticle;
