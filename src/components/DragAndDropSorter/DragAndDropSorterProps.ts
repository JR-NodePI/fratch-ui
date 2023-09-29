export type DraggableItem<T> = {
  children: JSX.Element;
  dataItem: T;
};

export type SortedDraggableItem<T> = Omit<DraggableItem<T>, 'children'> & {
  order: number;
};

export type InternalDraggableItem<T> = DraggableItem<T> &
  SortedDraggableItem<T> & {
    id: string;
  };

export interface DragAndDropSorterProps<T> {
  items: DraggableItem<T>[];
  onChange?: (items: SortedDraggableItem<T>[]) => void;
}
