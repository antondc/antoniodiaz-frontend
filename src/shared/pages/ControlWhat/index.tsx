import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { projectSortOne } from 'Modules/Projects/actions/projectSortOne';
import { selectProjectsCurrent } from 'Modules/Projects/selectors/selectProjectsCurrent';
import history from 'Services/History';
import { ImageUpload } from 'Services/ImageUpload';
import { CarouselFieldImage, SortableItem } from '@antoniodcorrea/components';
import { LocaleFormattedDate, noop } from '@antoniodcorrea/utils';
import { ControlWhat as ControlWhatUi } from './ControlWhat';

import './ControlWhat.less';

const incomingImages: CarouselFieldImage[] = [
  {
    id: 1,
    order: 10,
    src: 'https://picsum.photos/id/100/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/100/1000',
    alt: 'https://picsum.photos/id/100/1000',
  },
  {
    id: 2,
    order: 1,
    src: 'https://picsum.photos/id/200/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/200/1000',
    alt: 'https://picsum.photos/id/200/1000',
  },
  {
    id: 3,
    order: 2,
    src: 'https://picsum.photos/id/301/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/301/1000',
    alt: 'https://picsum.photos/id/301/1000',
  },
  {
    id: 4,
    order: 3,
    src: 'https://picsum.photos/id/400/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/400/1000',
    alt: 'https://picsum.photos/id/400/1000',
  },
];

const ControlWhat: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const glossary = useSelector(selectCurrentGlossary);
  const projects = useSelector(selectProjectsCurrent);
  const languageLoading = useSelector(selectLanguageLoading);
  const renderContent = !languageLoading && projects?.every((item) => item.language === language);
  const [carouselImages, setCarouselImages] = useState<Array<CarouselFieldImage>>([]);
  const [_, setCarouselPercentCompleted] = useState<number>(0);
  const imageUploadService = new ImageUpload();
  const projectsWithDates = projects.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: language });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  console.log('=======');
  console.log('carouselImages:');
  console.log(JSON.stringify(carouselImages, null, 4));
  console.log('=======');

  const onSortChange = async (sortableItem: SortableItem) => {
    await dispatch(
      projectSortOne({
        projectId: sortableItem.id,
        order: sortableItem.order,
      })
    );
    dispatch(projectsLoad());
  };

  const onNewProjectClick = () => {
    history.push(`/${language}/control/what/new`);
  };

  const onImagesChange = (carouselImages) => {
    setCarouselImages(carouselImages);
  };

  const onFileUpload = async (file): Promise<{ image: string }> => {
    if (!imageUploadService) {
      return;
    }

    try {
      const data = await imageUploadService.uploadFileToServer({
        file,
        setPercentCompleted: setCarouselPercentCompleted,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onFileRemove = async (src: string) => {
    if (!imageUploadService) {
      return;
    }

    try {
      await imageUploadService.removeFileFromServer({
        src,
        onRemoved: noop,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onCarouselSave = async () => {
    if (!carouselImages?.length) return;
    try {
      //
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCarouselImages(incomingImages);
    dispatch(projectsLoad());
  }, [language]);

  return (
    <ControlWhatUi
      glossary={glossary}
      projects={projectsWithDates}
      renderContent={renderContent}
      onSortChange={onSortChange}
      onNewProjectClick={onNewProjectClick}
      carouselImages={carouselImages}
      onImagesChange={onImagesChange}
      onFileRemove={onFileRemove}
      onFileUpload={onFileUpload}
      onCarouselSave={onCarouselSave}
    />
  );
};

export default ControlWhat;
