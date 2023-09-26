import { useEffect, useState } from 'react';

import { c } from '../../../helpers/classNameHelpers';
import { type SwitcherProps } from './SwitcherProps';

import styles from './Switcher.module.css';

const Switcher = ({
  value,
  className,
  labelLeft,
  labelRight,
  title,
  disabled,
  onChange,
  IconOn,
  IconOff,
}: SwitcherProps): JSX.Element => {
  const [switchOn, setSwitchOn] = useState<boolean>(value ?? false);

  useEffect(() => {
    setSwitchOn(value ?? false);
  }, [value]);

  const handleToggle = (): void => {
    if (disabled) return;
    setSwitchOn(!switchOn);
    onChange?.(!switchOn);
  };

  return (
    <label
      title={title}
      className={c(
        styles.switcher,
        switchOn ? styles.on : styles.off,
        disabled ? styles.disabled : '',
        className
      )}
    >
      {labelLeft}
      <button onClick={handleToggle} className={c(styles.switcher_button)}>
        <span className={c(styles.switcher_button_dot)}>
          {switchOn && IconOn && (
            <IconOn className={c(styles.switcher_button_icon)} />
          )}
          {!switchOn && IconOff && (
            <IconOff className={c(styles.switcher_button_icon)} />
          )}
        </span>
      </button>
      {labelRight}
    </label>
  );
};

export default Switcher;
