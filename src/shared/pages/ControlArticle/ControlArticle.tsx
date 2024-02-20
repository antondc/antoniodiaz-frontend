import React from 'react';

import BaseForm, { BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { Input } from 'Components/Input';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Hr, ImageField, Switch, TextEditor, TextEditorValue } from '@antoniodcorrea/components';

import './ControlArticle.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  ogImageValue: string;
  ogImageError: string;
  percentCompleted: number;
  uploadFilesToServer: (file: File) => void;
  removeFilesFromServer: (file: any) => void;
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

export const ControlArticle: React.FC<Props> = ({
  imageUploadService,
  onChangeTitle,
  titleValue,
  titleError,
  ogImageValue,
  percentCompleted,
  uploadFilesToServer,
  removeFilesFromServer,
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
  <div className="ControlArticle">
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
      <BaseFormField>
        <BaseFormLabel>Og image</BaseFormLabel>
        <ImageField
          className="UserForm-image"
          label="Og image"
          name="ogImage"
          image={ogImageValue}
          grow={false}
          uploadFiles={uploadFilesToServer}
          onRemove={removeFilesFromServer}
          percentCompleted={percentCompleted}
          accept={{
            ['image/png']: ['.png'],
            ['image/jpg']: ['.jpg'],
          }}
        />
      </BaseFormField>
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
        <Switch className="ControlArticle-published" name="published" checked={publishedValue} />
      </BaseFormField>
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
