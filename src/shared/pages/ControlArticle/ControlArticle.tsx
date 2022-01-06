import React from 'react';

import BaseForm, { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import TextEditor from 'Components/TextEditor';
import { ArticleState } from 'Modules/Articles/articles.types';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Fade } from '@antoniodcorrea/components';

import './ControlArticle.less';

interface Props {
  article: ArticleState;
  renderContent: boolean;
  textEditorValue: string;
  imageUpload: ImageUpload;
  submitError: string;
  submitting: boolean;
  submitSuccess: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  onChangeTextEditorValue: (value: string) => void;
}

export const ControlArticle: React.FC<Props> = ({
  article,
  renderContent,
  imageUpload,
  textEditorValue,
  onSubmit,
  submitError,
  submitting,
  submitSuccess,
  onChangeTextEditorValue,
}) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlArticle">
      <h1 className="ControlArticle-title">{article?.title}</h1>
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
  </Fade>
);
