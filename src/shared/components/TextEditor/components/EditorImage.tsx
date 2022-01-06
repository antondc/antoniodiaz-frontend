import React, { useEffect, useState } from 'react';
import { ReactEditor, useFocused, useSelected, useSlate } from 'slate-react';

import { Fade, ImageField } from '@antoniodcorrea/components';
import { ImageElement, ImageUpload } from '../types';
import { useCustomEditor } from '../useCustomEditor';

import './EditorImage.less';

interface Props {
  attributes: any;
  imageUploadService: ImageUpload;
  element: ImageElement;
}

export const EditorImage: React.FC<Props> = ({ attributes, element, children, imageUploadService }) => {
  const [percentCompleted, setPercentCompleted] = useState<number>(0);
  const [image, setImage] = useState<string | ArrayBuffer>(undefined);
  const [imageError, setImageError] = useState<string>(null);
  const selected = useSelected();
  const focused = useFocused();
  const editor = useSlate();
  const { updateImageBlock, removeImageBlock } = useCustomEditor();
  const path = ReactEditor.findPath(editor, element);

  const uploadFilesToServer = async (file) => {
    try {
      const data = await imageUploadService.uploadFileToServer({
        file,
        setPercentCompleted,
      });

      const image = {
        ...element,
        src: data?.image,
      };
      updateImageBlock(editor, image, path);
    } catch (error) {
      setImageError(error?.message);
    }
  };

  const onRemoved = (): void => {
    setImageError(undefined);
    setImage(undefined);
  };

  const onWrapperClick = () => {
    ReactEditor.focus(editor);
  };

  const removeFilesFromServer = (url: string) => {
    try {
      imageUploadService.removeFileFromServer({
        url,
        onRemoved,
      });
    } catch (error) {
      setImageError(error.message);
    } finally {
      removeImageBlock(editor, path);
    }
  };

  const onMouseLeave = async () => {
    setImageError(undefined);
  };

  useEffect(() => {
    const original = element?.src;

    setImage(original);
  }, [element]);

  return (
    <div
      className={'EditorImage' + (selected && focused ? ' EditorImage--selected' : '')}
      onMouseLeave={onMouseLeave}
      contentEditable={false}
      suppressContentEditableWarning
      onClick={onWrapperClick}
      {...attributes}
    >
      <ImageField
        className="EditorImage-image"
        label="My file"
        name="userImage"
        image={image as string}
        grow={false}
        removable
        uploadFiles={uploadFilesToServer}
        onRemove={removeFilesFromServer}
        percentCompleted={percentCompleted}
        accept=".jpg,.jpeg,.png"
      />
      <Fade mounted={!!imageError} position="absolute">
        <span className="EditorImage-error">{imageError}</span>
      </Fade>
      <div className="EditorImage-title">{children}</div>
    </div>
  );
};
