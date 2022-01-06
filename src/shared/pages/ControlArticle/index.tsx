import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextEditorValue } from 'Components/TextEditor';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { articleUpdateOne } from 'Modules/Articles/actions/articleUpdateOne';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamArticleId } from 'Modules/Routes/selectors/selectCurrentRouteParamArticleId';
import { ImageUpload } from 'Services/ImageUpload';
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
        contentHtml: '',
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
    const textFormData = article?.contentJson;

    setTitleValue(article?.title);
    onChangeTextEditorValue(textFormData);
  }, [article]);

  return (
    <ControlWhenUi
      onChangeTitle={onChangeTitle}
      titleValue={titleValue}
      titleError={titleError}
      textEditorValue={textEditorValue}
      onChangeTextEditorValue={onChangeTextEditorValue}
      imageUpload={imageUpload}
      onSubmit={onSubmit}
      submitError={submitError}
      submitting={submitting}
      submitSuccess={submitSuccess}
      renderContent={renderContent}
    />
  );
};

export default ControlArticle;
