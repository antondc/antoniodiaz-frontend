import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { projectUpdateOne } from 'Modules/Projects/actions/projectUpdateOne';
import { selectProject } from 'Modules/Projects/selectors/selectProject';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamProjectId } from 'Modules/Routes/selectors/selectCurrentRouteParamProjectId';
import { ENDPOINT_API } from 'Root/webpack/constants';
import { ImageUpload } from 'Services/ImageUpload';
import { CarouselFieldSlide, TextEditorValue } from '@antoniodcorrea/components';
import { noop } from '@antoniodcorrea/utils';
import { ControlProject as ControlWhenUi } from './ControlProject';

import './ControlProject.less';

const ControlProject: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const imageUploadService = new ImageUpload();
  const projectId = useSelector(selectCurrentRouteParamProjectId);
  const project = useSelector((state: RootState) => selectProject(state, Number(projectId)));
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [carouselImages, setCarouselImages] = useState<Array<CarouselFieldSlide>>([]);
  const [carouselPercentCompleted, setCarouselPercentCompleted] = useState<number>(0);
  const [textEditorValue, setTextEditorValue] = useState<TextEditorValue>(undefined);
  const [publishError, setPublishError] = useState<string>(undefined);
  const [publishing, setPublishing] = useState<boolean>(undefined);
  const [publishSuccess, setPublishingSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [publishedValue, setPublishedValue] = useState<boolean>(undefined);
  const [pressFileName, setPressFileName] = useState<string>(undefined);
  const [pressFileUrl, setPressFileUrl] = useState<string>(undefined);
  const [pressFileError, setPressFileError] = useState<string>(undefined);

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
      const projectData = {
        ...project,
        published: !publishedValue,
      };
      dispatch(projectUpdateOne({ projectId: Number(projectId), projectData }));

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
      const projectData = {
        ...project,
        title: titleValue,
        contentJson: textEditorValue,
        carousel: carouselImages,
        files: [
          {
            name: pressFileName,
            url: pressFileUrl,
          },
        ],
      };
      dispatch(projectUpdateOne({ projectId: Number(projectId), projectData }));

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const onCarouselChange = (carouselImages) => {
    setCarouselImages(carouselImages);
  };

  const onFileUpload = async (file): Promise<{ file: string }> => {
    setSubmitError(undefined);
    setSubmitting(undefined);
    setSubmitSuccess(undefined);
    setPublishError(undefined);
    setPublishing(undefined);
    setPublishingSuccess(undefined);

    if (!imageUploadService) {
      return;
    }

    try {
      const data = await imageUploadService.uploadFileToServer({
        file,
        setPercentCompleted: setCarouselPercentCompleted,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onPressFileUpdated = async (file: File) => {
    const uploadedFile = await onFileUpload(file);

    setPressFileUrl(uploadedFile.file);
    setPressFileName(file.name);
  };

  const onFileRemove = async (src: string) => {
    if (!imageUploadService) return;

    try {
      await imageUploadService.removeFileFromServer({
        src,
        onRemoved: noop,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPressFileRemove = async (src: string) => {
    if (!imageUploadService) return;

    try {
      await imageUploadService.removeFileFromServer({
        src,
        onRemoved: () => {
          setPressFileUrl(undefined);
          setPressFileName(undefined);
        },
      });
    } catch (error) {
      setPressFileError(error.message);
    }
  };

  useEffect(() => {
    dispatch(projectsLoad());
  }, [language]);

  useEffect(() => {
    setCarouselImages(project?.carousel);
    setPublishedValue(!!project?.published);
    setTitleValue(project?.title);

    const textFormData = project?.contentJson;
    setTextEditorValue(textFormData);

    if (!!project?.files) {
      setPressFileUrl(ENDPOINT_API + project?.files[0].url);
      setPressFileName(project?.files[0].name);
    }
  }, [project]);

  return (
    <ControlWhenUi
      titleValue={titleValue}
      titleError={titleError}
      onChangeTitle={onChangeTitle}
      carouselImages={carouselImages}
      onCarouselChange={onCarouselChange}
      onFileRemove={onFileRemove}
      onFileUpload={onFileUpload}
      onPressFileUpdated={onPressFileUpdated}
      onPressFileRemove={onPressFileRemove}
      pressFileName={pressFileName}
      pressFileUrl={pressFileUrl}
      pressFileError={pressFileError}
      carouselPercentCompleted={carouselPercentCompleted}
      textEditorInitialValue={project?.contentJson}
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

export default ControlProject;
