import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentRouteParams } from '../../redux/modules/Routes/selectors/selectCurrentRouteParams';
import { Post as PostUi } from './Post';

const Post: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);
  const params = useSelector(selectCurrentRouteParams);
  const id = Number(params?.id);
  if (!id) return null;

  return <PostUi glossary={glossary} id={id} />;
};
export default Post;
