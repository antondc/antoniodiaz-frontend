import React from 'react';

import BaseForm, { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { Input } from 'Components/Input';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, TextEditor, TextEditorValue } from '@antoniodcorrea/components';

import './ControlArticleCreate.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  textEditorDefaultValue: TextEditorValue;
  onChangeTextEditorValue: (value: TextEditorValue) => void;
  imageUploadService: ImageUpload;
  submitError: string;
  submitting: boolean;
  submitSuccess: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ControlArticleCreate: React.FC<Props> = ({
  imageUploadService,
  onChangeTitle,
  titleValue,
  titleError,
  textEditorDefaultValue,
  onChangeTextEditorValue,
  onSubmit,
  submitError,
  submitting,
  submitSuccess,
}) => (
  <div className="ControlArticleCreate">
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
          initialValue={textEditorDefaultValue}
          onChange={onChangeTextEditorValue}
          imageUploadService={imageUploadService}
        />
      </BaseFormField>
      <BaseFormSubmit>
        <Button
          text="Save"
          type="submit"
          onClick={onSubmit}
          error={!!submitError}
          success={submitSuccess}
          disabled={false}
          loading={submitting}
          grow
        />
      </BaseFormSubmit>
    </BaseForm>
  </div>
);
