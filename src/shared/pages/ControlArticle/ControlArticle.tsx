import React from 'react';

import BaseForm, { BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Input, Switch, TextEditor, TextEditorValue } from '@antoniodcorrea/components';

import './ControlArticle.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  textEditorInitialValue: TextEditorValue;
  onChangeTextEditorValue: (value: TextEditorValue) => void;
  imageUploadService: ImageUpload;
  publishedValue: boolean;
  onChangePublished: (e: React.FormEvent<HTMLInputElement>) => void;
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
  textEditorInitialValue,
  onChangeTextEditorValue,
  publishedValue,
  onChangePublished,
  onSubmit,
  submitError,
  submitting,
  submitSuccess,
}) => (
  <div className="ControlArticle">
    <BaseForm>
      <BaseFormField>
        <Input
          name="nameOrEmail"
          type="text"
          label="Name or Email"
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
      <BaseFormField>
        <BaseFormLabel>Published</BaseFormLabel>
        <Switch name="published" checked={publishedValue} onChange={onChangePublished} />
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
      </BaseFormSubmit>
    </BaseForm>
  </div>
);
