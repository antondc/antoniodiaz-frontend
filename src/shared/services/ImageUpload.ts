import HttpClient from 'Services/HttpClient';

const FILE_ENDPOINT = '/files/single';
const FILE_UPLOAD_ERROR_MESSAGE = 'Could not upload file to server';
const FILE_REMOVAL_ERROR_MESSAGE = 'Could not delete file from server';

type ImageUploadResponse = {
  data: {
    file: string;
  };
};

type UploadFileToServer = (options: {
  file: File;
  setPercentCompleted: (number: number) => void;
}) => Promise<{ file: string }>;

type RemoveFileFromServer = (options: { src: string; onRemoved: () => void }) => Promise<void>;

export class ImageUpload {
  uploadFileToServer: UploadFileToServer = async ({ file, setPercentCompleted }) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      onUploadProgress: (progressEvent): void => {
        const { loaded, total } = progressEvent;
        const completed = Math.round((loaded * 100) / total);

        setPercentCompleted(completed);
      },
    };

    try {
      const { data } = await HttpClient.post<void, ImageUploadResponse>(FILE_ENDPOINT, formData, config);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error(FILE_UPLOAD_ERROR_MESSAGE);
    } finally {
      setPercentCompleted(0);
    }
  };

  removeFileFromServer: RemoveFileFromServer = async ({ src, onRemoved }) => {
    if (!confirm('Are you sure?')) return;

    try {
      await HttpClient.delete<void, ImageUploadResponse>(FILE_ENDPOINT, { data: { path: src } });

      onRemoved();
    } catch (error) {
      console.error(error);
      throw new Error(FILE_REMOVAL_ERROR_MESSAGE);
    } finally {
      // Do nothing
    }
  };
}
