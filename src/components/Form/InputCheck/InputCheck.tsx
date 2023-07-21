import { forwardRef, useEffect, useRef, useState } from 'react';
import { c } from '../../../helpers/classNameHelpers';
import styles from './InputCheck.module.css';

export const InputCheckPropsPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

type InputCheckProps = {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  position?: (typeof InputCheckPropsPosition)[keyof typeof InputCheckPropsPosition];
};

const InputCheck = forwardRef<HTMLInputElement, InputCheckProps>(
  (
    {
      checked,
      className,
      disabled,
      label,
      onChange,
      position = InputCheckPropsPosition.LEFT,
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

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(event);
      setIsChecked(event.target.checked);
    };

    return (
      <label className={c(styles.checkbox, styles[position], className)}>
        <input ref={ref} type="checkbox" disabled={disabled} onChange={handleOnChange} />
        <span>{label}</span>
      </label>
    );
  }
);

export default InputCheck;
