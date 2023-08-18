import { forwardRef, useEffect, useRef, useState } from 'react';

import { c } from '../../../helpers/classNameHelpers';
import { Icons } from '../..';
import { InputCheckPosition } from './InputCheckConstants';
import type { InputCheckProps } from './InputCheckProps';

import styles from './InputCheck.module.css';

const InputCheck = forwardRef<HTMLInputElement, InputCheckProps>(
  (
    {
      checked,
      className,
      disabled,
      label,
      onChange,
      position = InputCheckPosition.LEFT,
    }: InputCheckProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isChecked, setIsChecked] = useState<boolean>(checked ?? false);

    if (ref == null) {
      ref = inputRef;
    }

    useEffect(() => {
      if (typeof ref === 'object' && ref?.current != null) {
        ref.current.checked = isChecked;
      }
    }, [isChecked, ref]);

    const handleOnChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
      onChange && onChange(event.target.checked);
      setIsChecked(event.target.checked);
    };

    return (
      <label className={c(styles.checkbox, styles[position], className)}>
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          onChange={handleOnChange}
        />
        <Icons.IconCheck className={c(styles.icon_check)} />
        <span>{label}</span>
      </label>
    );
  }
);

export default InputCheck;
