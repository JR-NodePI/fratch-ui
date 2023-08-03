export interface InputTextProps {
  className?: string;
  cleanable?: boolean;
  cleanerClassName?: string;
  disabled?: boolean;
  id?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  onClean?: (element?: HTMLInputElement) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDownCapture?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  title?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
}
