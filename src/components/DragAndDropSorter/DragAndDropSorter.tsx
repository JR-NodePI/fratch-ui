import { useEffect, useRef, useState } from 'react';

import { c } from '../../helpers';
import type {
  DragAndDropSorterProps,
  InternalDraggableItem,
} from './DragAndDropSorterProps';

import styles from './DragAndDropSorter.module.css';

export default function DragAndDropSorter<T>({
  items,
  onChange,
}: DragAndDropSorterProps<T>): JSX.Element {
  const [draggableItems, setDraggableItems] = useState<
    InternalDraggableItem<T>[]
  >([]);

  useEffect(() => {
    setDraggableItems(
      items.map(({ children, dataItem }, order) => ({
        id: crypto.randomUUID(),
        children,
        dataItem,
        order,
      }))
    );
  }, [items]);

  const dragElementRef = useRef<HTMLDivElement>();

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = 'move';

    const dragElement = event.target as HTMLDivElement;
    dragElement.classList.add(styles.dragging);
    dragElementRef.current = dragElement;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    const dragOverElement = (
      event.target as HTMLDivElement
    ).closest<HTMLDivElement>('[draggable="true"]');

    if (
      dragOverElement?.draggable &&
      dragOverElement != dragElementRef.current
    ) {
      dragOverElement.classList.add(styles.drag_over);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const dragOverElement = event.target as HTMLDivElement;
    if (dragOverElement.draggable) {
      dragOverElement.classList.remove(styles.drag_over);
    }
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    const dragElement = event.target as HTMLDivElement;
    dragElement.classList.remove(styles.dragging);
    dragElementRef.current = undefined;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    const dropElement = event.target as HTMLDivElement;
    dropElement.classList.remove(styles.drag_over);
    const itemId = dropElement.id;
    const dragItemId = dragElementRef.current?.id;

    if (itemId === dragItemId) {
      return;
    }

    if (dropElement.draggable && dragElementRef.current) {
      const draggingItem = draggableItems.find(item => item.id === dragItemId);

      const newDraggableItems = draggableItems.reduce<
        InternalDraggableItem<T>[]
      >((newItems, item) => {
        if (item.id === dragItemId) {
          return newItems;
        }

        const order = newItems.length;

        if (item.id === itemId && draggingItem) {
          const isGoingDown = draggingItem.order > item.order;
          const upElement = isGoingDown ? draggingItem : item;
          const downElement = isGoingDown ? item : draggingItem;
          return [
            ...newItems,
            { ...upElement, order },
            { ...downElement, order: order + 1 },
          ];
        }

        return [...newItems, { ...item, order }];
      }, []);

      setDraggableItems(newDraggableItems);

      const sortedDraggableItems = newDraggableItems.map(
        ({ dataItem, order }) => ({ dataItem, order })
      );
      onChange?.(sortedDraggableItems);
    }
  };

  return (
    <div className={c(styles.wrapper)}>
      {draggableItems.map(({ id, children }) => (
        <div
          className={c(styles.draggable)}
          draggable
          id={id}
          key={id}
          onDragEnd={handleDragEnd}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
