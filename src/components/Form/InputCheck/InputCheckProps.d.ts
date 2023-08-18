import { InputCheckPosition } from './InputCheckConstants';

export type InputCheckProps = {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
  position?: (typeof InputCheckPosition)[keyof typeof InputCheckPosition];
};
