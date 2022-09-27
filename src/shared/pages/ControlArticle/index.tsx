import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { articleUpdateOne } from 'Modules/Articles/actions/articleUpdateOne';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamArticleId } from 'Modules/Routes/selectors/selectCurrentRouteParamArticleId';
import { ImageUpload } from 'Services/ImageUpload';
import { textEditorDefaultValue, TextEditorValue } from '@antoniodcorrea/components';
import { ControlArticle as ControlArticleUi } from './ControlArticle';

import './ControlArticle.less';

const ControlArticle: React.FC = () => {
  const dispatch = useDispatch();
  const imageUploadService = new ImageUpload();
  const articleId = useSelector(selectCurrentRouteParamArticleId);
  const article = useSelector((state: RootState) => selectArticle(state, Number(articleId)));
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>(textEditorDefaultValue);
  const [ogImage, setOgImage] = useState<{ original: string }>(undefined);
  const [ogImageError, setOgImageError] = useState<string>(null);
  const [ogImagePercentCompleted, setOgImagePercentCompleted] = useState<number>(0);
  const [publishError, setPublishError] = useState<string>(undefined);
  const [publishing, setPublishing] = useState<boolean>(undefined);
  const [publishSuccess, setPublishingSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [publishedValue, setPublishedValue] = useState<boolean>(undefined);

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setTitleValue(value);
    setSubmitError(undefined);
    setTitleError(undefined);
    setPublishError(undefined);
    setPublishingSuccess(undefined);
    setSubmitSuccess(undefined);
  };

  const uploadFilesToServer = async (file) => {
    try {
      const data = await imageUploadService.uploadFileToServer({
        file,
        setPercentCompleted: setOgImagePercentCompleted,
      });
      await setOgImage({
        original: data?.file,
      });
    } catch (error) {
      setOgImageError(error.message);
    }
  };

  const onRemoved = (): void => {
    setOgImageError(undefined);
    setOgImage(undefined);
  };

  const removeFilesFromServer = async (url: string) => {
    try {
      await imageUploadService.removeFileFromServer({
        src: url,
        onRemoved,
      });
    } catch (error) {
      setOgImageError(error.message);
    }
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
        ogImage: ogImage?.original,
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
    if (!article) return;

    setPublishedValue(!!article?.published);
    setTitleValue(article?.title);
    setOgImage({ original: article?.ogImage });

    const textFormData = !!article?.contentJson?.length ? article?.contentJson : textEditorDefaultValue;
    setTextEditorValue(textFormData);
  }, [article]);

  useEffect(() => {}, []);

  return (
    <ControlArticleUi
      titleValue={titleValue}
      titleError={titleError}
      onChangeTitle={onChangeTitle}
      ogImageValue={ogImage?.original}
      ogImageError={ogImageError}
      percentCompleted={ogImagePercentCompleted}
      uploadFilesToServer={uploadFilesToServer}
      removeFilesFromServer={removeFilesFromServer}
      textEditorInitialValue={textEditorValue}
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
