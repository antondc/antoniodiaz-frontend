import React from 'react';

import BaseForm, { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import TextEditor, { TextEditorValue } from 'Components/TextEditor';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Fade, Input } from '@antoniodcorrea/components';

import './ControlArticle.less';

interface Props {
  renderContent: boolean;
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  textEditorValue: TextEditorValue;
  onChangeTextEditorValue: (value: TextEditorValue) => void;
  imageUpload: ImageUpload;
  submitError: string;
  submitting: boolean;
  submitSuccess: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ControlArticle: React.FC<Props> = ({
  renderContent,
  imageUpload,
  onChangeTitle,
  titleValue,
  titleError,
  textEditorValue,
  onChangeTextEditorValue,
  onSubmit,
  submitError,
  submitting,
  submitSuccess,
}) => (
  <Fade mounted={renderContent} appear>
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
          <TextEditor value={textEditorValue} onChange={onChangeTextEditorValue} imageUpload={imageUpload} />
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
  </Fade>
);
