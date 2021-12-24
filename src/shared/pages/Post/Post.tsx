import React from 'react';

import { GlossaryState } from 'Modules/Languages/languages.types';

import './Post.less';

interface Props {
  glossary: GlossaryState;
  id: number;
}

export const Post: React.FC<Props> = ({ glossary, id }) => (
  <div className="Post">
    <h1 className="Post-title">
      {glossary.post}: {id}
    </h1>
  </div>
);
