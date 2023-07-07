import { SelectOption } from '../SelectProps';

export type SelectOptionsListProps<T> = {
  noResultsElement?: React.ReactNode;
  onChange?: (value: number) => void;
  options: SelectOption<T>[];
  selectedIndex?: number;
  triggerDOMRect?: DOMRect;
  visible?: boolean;
};
