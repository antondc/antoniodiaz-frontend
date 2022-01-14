import React from 'react';

import BaseForm, { BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Hr, Input, Switch, TextEditor, TextEditorValue } from '@antoniodcorrea/components';

import './ControlProject.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
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
