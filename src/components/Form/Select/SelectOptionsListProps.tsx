import { SelectOption } from './SelectProps';

export type SelectOptionsListProps<T> = {
  noResultsElement?: React.ReactNode;
  onChange?: (value: number) => void;
  options: SelectOption<T>[];
  selectedIndex?: number;
  focusedIndex?: number;
  setFocusedItemIndex: (index: number) => void;
  triggerDOMRect?: DOMRect;
  visible?: boolean;
};
