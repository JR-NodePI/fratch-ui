export type SelectOption<T> = {
  label: string;
  labelElement?: React.ReactNode;
  value: T;
  visible?: boolean;
  title?: string;
};

export interface SelectProps<T> {
  className?: string;
  cleanable?: boolean;
  disabled?: boolean;
  id?: string;
  noResultsElement?: React.ReactNode;
  onChange?: (value?: T) => void;
  onClean?: () => void;
  options: SelectOption<T>[];
  placeholder?: string;
  searchable?: boolean;
  title?: string;
  triggerElementRef?: React.RefObject<HTMLInputElement>;
  value?: T;
}
