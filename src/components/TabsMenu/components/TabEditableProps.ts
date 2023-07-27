export type TabEditableProps = {
  className?: string;
  editable?: boolean;
  label?: string;
  onActivate?: () => void;
  onChange?: (value: string) => void;
};
