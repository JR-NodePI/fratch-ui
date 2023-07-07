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
      placeholder,
      readOnly,
      type = 'text',
      value,
    }: InputProps,
    ref
  ) => (
    <input
      ref={ref}
      className={c(styles.input, className)}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      placeholder={placeholder}
      readOnly={readOnly}
      type={type}
      value={value}
    />
  )
);

export default Input;
