import { forwardRef, useEffect, useRef } from 'react';

import { c } from '../../../helpers/classNameHelpers';
import { IconClose } from '../../Icons/Icons';
import { type InputTextProps } from './InputTextProps';

import styles from './InputText.module.css';

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      className,
      cleanable,
      cleanerClassName,
      disabled,
      id,
      onBlur,
      onChange,
      onClean,
      onClick,
      onFocus,
      onKeyDownCapture,
      placeholder,
      readOnly,
      title,
      type = 'text',
      value,
    }: InputTextProps,
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>();

    useEffect(() => {
      if (innerRef.current != null) {
        innerRef.current.value = value ?? '';
      }
    }, [value]);

    const handleOnClean = (): void => {
      if (innerRef.current != null) {
        innerRef.current.value = '';
        innerRef.current.focus();
      }
      onChange?.();
      onClean?.(innerRef.current);
    };

    const setInnerRef = (current: HTMLInputElement): void => {
      if (typeof ref === 'function') ref(current);
      else if (ref) ref.current = current;
      innerRef.current = current;
    };

    return (
      <div className={c(styles.input_text, className)}>
        <input
          id={id}
          name={id}
          className={c(styles.input)}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDownCapture={onKeyDownCapture}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={setInnerRef}
          title={title}
          type={type}
        />
        {cleanable && (
          <button
            className={c(styles.cleaner, cleanerClassName)}
            onClick={handleOnClean}
          >
            <IconClose className={c(styles.cleaner_icon)} />
            <i>Clean</i>
          </button>
        )}
      </div>
    );
  }
);

export default InputText;
