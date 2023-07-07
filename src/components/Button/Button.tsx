import { c } from '../../helpers/classNameHelpers';

import { ButtonSize, ButtonType } from './ButtonProps';
import type { ButtonProps } from './ButtonProps';

import styles from './Button.module.css';

const Button = ({
  className,
  label,
  onClick,
  size = ButtonSize.MEDIUM,
  type = ButtonType.PRIMARY,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={c(styles.default, styles[type], styles[size], className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
