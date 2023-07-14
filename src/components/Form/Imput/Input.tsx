import { forwardRef } from 'react';
import { c } from '../../../helpers/classNameHelpers';
import styles from './Input.module.css';
import { type InputProps } from './InputProps';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDownCapture,
      placeholder,
      readOnly,
      type = 'text',
      value,
    }: InputProps,
    ref
  ) => (
    <input
      className={c(styles.input, className)}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDownCapture={onKeyDownCapture}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={ref}
      type={type}
      value={value}
    />
  )
);

export default Input;
