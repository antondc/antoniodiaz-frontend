import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamArticleId } from 'Modules/Routes/selectors/selectCurrentRouteParamArticleId';
import { ImageUpload } from 'Services/ImageUpload';
import { mockApiCall } from 'Tools/utils/async/mockApiCall';
import { ControlArticle as ControlWhenUi } from './ControlArticle';

import './ControlArticle.less';

const ControlArticle: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const languageLoading = useSelector(selectLanguageLoading);
  const imageUpload = new ImageUpload();
  const articleId = useSelector(selectCurrentRouteParamArticleId);
  const article = useSelector((state: RootState) => selectArticle(state, Number(articleId)));
  const renderContent = !languageLoading && article?.language === language;
  const [textEditorValue, setTextEditorValue] = useState<string>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);

  const onChangeTextEditorValue = (value: string) => {
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

  useEffect(() => {
    dispatch(articlesLoad());
  }, [language]);

  useEffect(() => {
    const textFormData = JSON.stringify(article?.contentJson?.data);

    setTextEditorValue(textFormData);
  }, [article?.id]);

  if (!article?.contentJson) return <div />;

  return (
    <ControlWhenUi
      article={article}
      textEditorValue={textEditorValue}
      imageUpload={imageUpload}
      onSubmit={onSubmit}
      submitError={submitError}
      submitting={submitting}
      submitSuccess={submitSuccess}
      onChangeTextEditorValue={onChangeTextEditorValue}
      renderContent={renderContent}
    />
  );
};

export default ControlArticle;
