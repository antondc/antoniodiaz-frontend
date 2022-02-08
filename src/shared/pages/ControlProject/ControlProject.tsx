import React from 'react';

import BaseForm, { BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { FILE_SIZE_LIMIT } from 'Root/src/shared/constants';
import { ImageUpload } from 'Services/ImageUpload';
import {
  Button,
  CarouselField,
  CarouselFieldSlide,
  FileField,
  Hr,
  Input,
  Switch,
  TextEditor,
  TextEditorValue,
} from '@antoniodcorrea/components';

import './ControlProject.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  carouselImages: CarouselFieldSlide[];
  onCarouselChange: (images) => void;
  onFileUpload: (file: File) => Promise<{ file: string }>;
  onFileRemove: (src: string) => Promise<void>;
  onPressFileUpdated: (file: File) => Promise<void>;
  onPressFileRemove: (src: string) => Promise<void>;
  pressFileName: string;
  pressFileUrl: string;
  pressFileError: string;
  carouselPercentCompleted: number;
  textEditorInitialValue: TextEditorValue;
  onChangeTextEditorValue: (value: TextEditorValue) => void;
  imageUploadService: ImageUpload;
  publishedValue: boolean;
  onChangePublish: (e: React.FormEvent<HTMLButtonElement>) => void;
  publishError: string;
  publishSuccess: boolean;
  publishing: boolean;
  submitError: string;
  submitting: boolean;
  submitSuccess: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ControlProject: React.FC<Props> = ({
  imageUploadService,
  onChangeTitle,
  titleValue,
  titleError,
  carouselImages,
  onCarouselChange,
  onFileUpload,
  onPressFileUpdated,
  onPressFileRemove,
  onFileRemove,
  pressFileName,
  pressFileError,
  pressFileUrl,
  carouselPercentCompleted,
  textEditorInitialValue,
  onChangeTextEditorValue,
  publishedValue,
  onChangePublish,
  publishError,
  publishSuccess,
  publishing,
  submitError,
  submitting,
  submitSuccess,
  onSubmit,
}) => (
  <div className="ControlProject">
    <BaseForm>
      <BaseFormField>
        <Input
          name="title"
          type="text"
          label="Title"
          onChange={onChangeTitle}
          onBlur={onChangeTitle}
          value={titleValue}
          error={titleError}
          grow
        />
      </BaseFormField>
      <Hr spacer />
      <CarouselField
        images={carouselImages}
        onChange={onCarouselChange}
        onFileUpload={onFileUpload}
        onFileRemove={onFileRemove}
        percentCompleted={carouselPercentCompleted}
        maxSize={FILE_SIZE_LIMIT}
      />
      <Hr spacer />
      <BaseFormField>
        <TextEditor
          initialValue={textEditorInitialValue}
          onChange={onChangeTextEditorValue}
          imageUploadService={imageUploadService}
        />
      </BaseFormField>
      <Hr spacer />
      <BaseFormField>
        <BaseFormLabel>Published</BaseFormLabel>
        <Switch className="ControlProject-published" name="published" checked={publishedValue} />
      </BaseFormField>
      <Hr spacer />
      <BaseFormField>
        <FileField
          label="Press"
          name="Some file"
          accept=".pdf"
          fileUrl={pressFileUrl}
          uploadFiles={onPressFileUpdated}
          onRemove={onPressFileRemove}
          percentCompleted={0}
          removable
          success={!!pressFileUrl}
          error={!!pressFileError}
        />
      </BaseFormField>
      <Hr spacer />
      <BaseFormSubmit>
        <Button
          text="Submit"
          type="submit"
          onClick={onSubmit}
          error={!!submitError}
          success={submitSuccess}
          disabled={false}
          loading={submitting}
          grow
        />
        <Hr spacer />
        <Button
          text={publishedValue ? 'UnPublish' : 'Publish'}
          type="submit"
          onClick={onChangePublish}
          error={!!publishError}
          success={publishSuccess}
          disabled={false}
          loading={publishing}
          grow
        />
      </BaseFormSubmit>
    </BaseForm>
  </div>
);
