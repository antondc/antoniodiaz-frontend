import React, { useEffect } from 'react';

import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import type { Transform } from '@dnd-kit/utilities';

import './Sortable.less';
import './SortableItem.less';

export interface Props {
  children: React.ReactChild;
  id: string;
  index?: number;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  transition?: string | null;
  onRemove?(id: string): void;
}

export const SortableItem: React.FC<Props> = ({ children, id, index, onRemove }) => {
  const { active, listeners, setNodeRef, transform, transition, node } = useSortable({
    id,
  });
  const isActive = id === active?.id;

  const onRemoveHandle = (e) => {
    e.preventDefault();
    onRemove(id);
  };

  useEffect(() => {
    const remove = node.current.querySelector('#Remove') as HTMLElement;
    if (!remove) return;

    remove.addEventListener('mousedown', (e) => onRemoveHandle(e), { capture: true });
  }, [node]);

  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return;

    return React.cloneElement(child, {
      ...child.props,
      className: 'SortableItem' + (child.props.className ? ` ${child.props.className}` : ''),
      style: {
        transition: transition,
        '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
        '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
        '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
        '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
        '--index': index,
        zIndex: isActive ? 100000 : 1,
        ...child.props.style,
      } as React.CSSProperties,
      ref: setNodeRef,
      tabIndex: 0,

      ...listeners,
    });
  });

  return <>{clonedChildren}</>;
};
