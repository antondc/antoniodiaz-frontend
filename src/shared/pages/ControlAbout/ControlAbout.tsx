import React from 'react';

import BaseForm, { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { Input } from 'Components/Input';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Hr, TextEditor, TextEditorValue } from '@antoniodcorrea/components';

import './ControlAbout.less';

interface Props {
  titleValue: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  titleError: string;
  textEditorInitialValue: TextEditorValue;
  onChangeTextEditorValue: (value: TextEditorValue) => void;
  imageUploadService: ImageUpload;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  submitError: string;
  submitSuccess: boolean;
  submitting: boolean;
}

export const ControlAbout: React.FC<Props> = ({
  titleValue,
  onChangeTitle,
  titleError,
  textEditorInitialValue,
  onChangeTextEditorValue,
  imageUploadService,
  onSubmit,
  submitError,
  submitSuccess,
  submitting,
}) => (
  <div className="ControlAbout">
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
      </BaseFormSubmit>
    </BaseForm>
  </div>
);
