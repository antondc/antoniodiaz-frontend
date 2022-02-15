import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { projectUpdateOne } from 'Modules/Projects/actions/projectUpdateOne';
import { selectProject } from 'Modules/Projects/selectors/selectProject';
import { selectProjectsErrors } from 'Modules/Projects/selectors/selectProjectsErrors';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamProjectId } from 'Modules/Routes/selectors/selectCurrentRouteParamProjectId';
import { SERVER_URL } from 'Root/webpack/constants';
import { ImageUpload } from 'Services/ImageUpload';
import { CarouselFieldSlide, TextEditorValue } from '@antoniodcorrea/components';
import { noop } from '@antoniodcorrea/utils';
import { ControlProject as ControlWhenUi, FileUploadType } from './ControlProject';

import './ControlProject.less';

const ControlProject: React.FC = () => {
  const dispatch = useDispatch();
  const imageUploadService = new ImageUpload();
  const projectAsyncErrors = useSelector(selectProjectsErrors);
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
  const [files, setLocalFiles] = useState<Array<FileUploadType>>([]);

  const loadInitialData = async () => {
    await dispatch(projectsLoad());
  };
  useLoadInitialData({ loadInitialData });

  const resetFormState = () => {
    setSubmitError(undefined);
    setTitleError(undefined);
    setPublishError(undefined);
    setPublishingSuccess(undefined);
    setSubmitSuccess(undefined);
    setPublishing(undefined);
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setTitleValue(value);
    resetFormState();
  };

  const onChangeTextEditorValue = (value: TextEditorValue) => {
    resetFormState();

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
      const filesActive = files?.filter((item) => !!item.url);
      const projectData = {
        ...project,
        title: titleValue,
        contentJson: textEditorValue,
        carousel: carouselImages,
        files: filesActive,
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
    resetFormState();

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

  useEffect(() => {
    if (!project) return;

    setCarouselImages(project?.carousel);
    setPublishedValue(!!project?.published);
    setTitleValue(project?.title);

    const textFormData = project?.contentJson;
    setTextEditorValue(textFormData);

    const files = project?.files?.map((item, index) => ({ ...item, id: index, url: SERVER_URL + item.url }));
    if (files) {
      setLocalFiles(files);
    } else {
      setLocalFiles(undefined);
    }
  }, [project]);

  const onFilesChange = (files: Array<FileUploadType>) => {
    resetFormState();
    setLocalFiles(files);
  };

  useEffect(() => {
    if (!projectAsyncErrors?.length) return;

    setSubmitError(projectAsyncErrors[0]?.message);
  }, [projectAsyncErrors]);

  return (
    <ControlWhenUi
      titleValue={titleValue}
      titleError={titleError}
      onChangeTitle={onChangeTitle}
      carouselImages={carouselImages}
      onCarouselChange={onCarouselChange}
      onFileRemove={onFileRemove}
      onFileUpload={onFileUpload}
      files={files}
      onFilesChange={onFilesChange}
      carouselPercentCompleted={carouselPercentCompleted}
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

export default ControlProject;
