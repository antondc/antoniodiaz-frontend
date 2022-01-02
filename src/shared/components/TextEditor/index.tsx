import React from 'react';

import { TextEditor as TextEditorUi } from './TextEditor';

interface Props {
  something?: any;
}

const TextEditor: React.FC<Props> = () => <TextEditorUi />;

export default TextEditor;
