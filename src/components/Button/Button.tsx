import { c } from '../../helpers/classNameHelpers';
import { ButtonSize, ButtonType } from './ButtonProps';
import type { ButtonProps } from './ButtonProps';

import styles from './Button.module.css';

const Button = ({
  className,
  Icon,
  isRound,
  label,
  onClick,
  size = ButtonSize.MEDIUM,
  stretch = false,
  type = ButtonType.DEFAULT,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={c(
        styles.button,
        styles[type],
        styles[size],
        stretch ? styles.stretch : '',
        isRound ? styles.only_icon : '',
        className
      )}
      onClick={onClick}
      title={isRound ? label : ''}
    >
      {Icon != null && <Icon type="error" className={styles.icon} />}
      {!isRound && <span>{label}</span>}
    </button>
  );
};

export default Button;
