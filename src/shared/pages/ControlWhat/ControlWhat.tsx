import React from 'react';

import TextEditor, { TextEditorValue } from 'Components/TextEditor';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ImageUpload } from 'Services/ImageUpload';
import { Button } from '@antoniodcorrea/components';
import BaseForm, { BaseFormField, BaseFormSubmit } from '../../components/BaseForm';

import './ControlWhat.less';

interface Props {
  glossary: GlossaryState;
  textEditorValue: TextEditorValue;
  onChangeTextEditorValue: (value: TextEditorValue) => void;
  imageUpload: ImageUpload;
  submitError: string;
  submitting: boolean;
  submitSuccess: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ControlWhat: React.FC<Props> = ({
  glossary,
  imageUpload,
  textEditorValue,
  onChangeTextEditorValue,
  onSubmit,
  submitError,
  submitting,
  submitSuccess,
}) => (
  <div className="ControlWhat">
    <h1 className="ControlWhat-title">{glossary?.control}What</h1>
    <BaseForm>
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
);
