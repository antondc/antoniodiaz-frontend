import React, { useEffect, useState } from 'react';
import Sortable from 'sortablejs';

export type SortableItem = {
  id: number;
  order: number;
};

interface Props {
  id: string;
  className?: string;
  handleClass?: string;
  direction?: 'vertical' | 'horizontal';
  ghostClass?: string;
  chosenClass?: string;
  dragClass?: string;
  onSortChange: (sortableItem: SortableItem) => void;
}

export const SortableList: React.FC<Props> = ({
  id,
  className,
  children,
  handleClass,
  direction = 'vertical',
  ghostClass,
  chosenClass,
  dragClass,
  onSortChange,
}) => {
  // // Avoid instantiating Sortable if there are no children present
  const childrenLength = React.Children.count(children);
  if (!childrenLength) return null;

  const [newItem, setNewItem] = useState({ id: undefined, order: undefined });

  useEffect(() => {
    const el = document.getElementById(id);

    Sortable.create(el, {
      animation: 300,
      onEnd: (e) => {
        const oldIndex = e.oldIndex;
        const newIndex = e.newIndex;
        const directionUp = oldIndex < newIndex;

        const itemId = Number(e.item.getAttribute('data-id'));
        const element = directionUp ? e.item.previousElementSibling : e.item.nextElementSibling;
        const order = Number(element.getAttribute('data-order'));

        setNewItem({
          id: itemId,
          order,
        });
      },
      handle: !!handleClass && `.${handleClass}`,
      direction,
      ghostClass,
      chosenClass,
      dragClass,
    });
  }, [children]);

  useEffect(() => {
    onSortChange(newItem);
  }, [newItem]);

  return (
    <ul id={id} className={'SortableList' + (className ? ` ${className}` : '')}>
      {children}
    </ul>
  );
};
