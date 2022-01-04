import React, { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';

import { ImageUpload } from 'Services/ImageUpload';
import { Fade, ImageField } from '@antoniodcorrea/components';
import { ImageElement } from '../types';
import { useCustomEditor } from '../useCustomEditor';

import './EditorImage.less';

interface Props {
  element: ImageElement;
}

export const EditorImage: React.FC<Props> = ({ element, children }) => {
  const imageUpload = new ImageUpload();
  const [percentCompleted, setPercentCompleted] = useState<number>(0);
  const [image, setImage] = useState<string>(undefined);
  const [imageError, setImageError] = useState<string>(null);

  const editor = useSlate();
  const { updateImageBlock } = useCustomEditor();

  const uploadFilesToServer = async (file) => {
    try {
      const data = await imageUpload.uploadFileToServer({
        file,
        setPercentCompleted,
      });

      const image = {
        ...element,
        src: data?.image,
      };
      updateImageBlock(editor, image);
    } catch (error) {
      setImageError(error?.message);
    }
  };

  const onRemoved = (): void => {
    setImageError(undefined);
    setImage(undefined);
  };

  const removeFilesFromServer = async (url: string) => {
    try {
      await imageUpload.removeFileFromServer({
        url,
        onRemoved,
      });
    } catch (error) {
      setImageError(error.message);
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
    <div className="EditorImage" onMouseLeave={onMouseLeave}>
      <ImageField
        className="EditorImage-image"
        label="My file"
        name="userImage"
        image={image}
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
