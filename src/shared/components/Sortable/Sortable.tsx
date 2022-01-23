import React from 'react';

import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

import './Sortable.less';
import './SortableItem.less';

export type SortableSortProps = {
  id: number;
  order: number;
};

export interface Props {
  children: React.ReactNode | React.ReactNode[];
  className: string;
  disabled?: boolean;
  onRemove?(id: string): void;
  onSortEnd?(data: SortableSortProps): void;
}

export const Sortable: React.FC<Props> = ({ children, className, onRemove, onSortEnd, disabled }: Props) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));
  const listItems: Array<{ id: string; order: number }> = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return;

    return {
      id: String(child.props['data-id']),
      order: child.props['data-order'],
    };
  });

  const handleDragEnd = (event) => {
    if (!onSortEnd) return;

    const itemId = event.active.id;
    const targetId = event.over.id;
    const itemOrigin = listItems.find((item) => item.id === itemId);
    const itemTarget = listItems.find((item) => item.id === targetId);

    onSortEnd({ id: Number(itemOrigin.id), order: itemTarget.order });
  };

  const handleRemove = (event) => {
    if (!onRemove) return;

    onRemove(event);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={listItems}>
        <ul className={'Sortable' + (className ? ` ${className}` : '') + (disabled ? ` Sortable--disabled` : '')}>
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return;

            return (
              <SortableItem key={child.key} id={String(child.key)} index={index} onRemove={handleRemove}>
                {child}
              </SortableItem>
            );
          })}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
