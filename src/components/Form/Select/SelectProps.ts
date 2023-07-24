export type SelectOption<T> = {
  label: string;
  labelElement?: React.ReactNode;
  value: T;
  visible?: boolean;
};

export interface SelectProps<T> {
  className?: string;
  cleanable?: boolean;
  disabled?: boolean;
  noResultsElement?: React.ReactNode;
  onChange?: (value?: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  searchable?: boolean;
  value?: T;
  triggerElementRef?: React.RefObject<HTMLInputElement>;
}
