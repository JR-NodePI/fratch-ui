export interface InputProps {
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  className?: string;
}
