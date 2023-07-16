import { forwardRef, useEffect, useRef, useState } from 'react';
import { c } from '../../../helpers/classNameHelpers';
import styles from './InputCheck.module.css';

type InputCheckProps = {
  checked?: boolean;
  className?: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputCheck = forwardRef<HTMLInputElement, InputCheckProps>(
  (
    { checked, className, label, onChange }: InputCheckProps,
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
      <label className={c(styles.checkbox, className)}>
        <input ref={ref} type="checkbox" onChange={handleOnChange} />
        <span>{label}</span>
      </label>
    );
  }
);

export default InputCheck;
