import React from 'react';

import BaseForm, { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import TextEditor, { TextEditorValue } from 'Components/TextEditor';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Input } from '@antoniodcorrea/components';

import './ControlArticleCreate.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
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
        <TextEditor initialValue={[]} onChange={onChangeTextEditorValue} imageUploadService={imageUploadService} />
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
