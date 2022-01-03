import { Editor } from 'slate';

import { useCustomEditor } from './useCustomEditor';

type UseEvents = (editor: Editor) => {
  onKeyDown: (e: React.KeyboardEvent) => void;
};

export const useEvents: UseEvents = (editor) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const { toggleFormat } = useCustomEditor();

    if ((!e.metaKey && !e.ctrlKey) || (e.key !== 'b' && e.key !== 'i' && e.key !== 'u')) {
      return;
    }

    let key;

    switch (e.key) {
      case 'b':
        key = 'bold';

        break;
      case 'i':
        key = 'italic';

        break;
      case 'u':
        key = 'underlined';

        break;
    }

    e.preventDefault();
    toggleFormat(editor, key);
  };

  return {
    onKeyDown,
  };
};
