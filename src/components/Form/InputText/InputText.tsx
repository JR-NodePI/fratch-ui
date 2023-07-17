import { forwardRef } from 'react';
import { c } from '../../../helpers/classNameHelpers';
import styles from './InputText.module.css';
import { type InputTextProps } from './InputTextProps';

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
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
      title,
    }: InputTextProps,
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
      title={title}
    />
  )
);

export default InputText;
