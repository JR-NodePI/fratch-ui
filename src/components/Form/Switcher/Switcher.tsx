import { ReactNode, useState } from 'react';

import { c } from '../../../helpers/classNameHelpers';
import { IconPlus as Icon } from '../../Icons/Icons';

import styles from './Switcher.module.css';

type SwitcherProps = {
  defaultSwitchOn?: boolean;
  className?: string;
  labelLeft?: ReactNode;
  labelRight?: ReactNode;
  title?: string;
  disabled?: boolean;
  onChange?: (switchOn: boolean) => void;
  IconOn?: typeof Icon;
  IconOff?: typeof Icon;
};

const Switcher = ({
  defaultSwitchOn,
  className,
  labelLeft,
  labelRight,
  title,
  disabled,
  onChange,
  IconOn,
  IconOff,
}: SwitcherProps) => {
  const [switchOn, setSwitchOn] = useState<boolean>(defaultSwitchOn ?? false);

  const handleToggle = () => {
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
