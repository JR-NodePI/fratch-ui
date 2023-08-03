import { c } from '../../helpers/classNameHelpers';
import { ButtonSize, ButtonType } from './ButtonConstants';
import type { ButtonProps } from './ButtonProps';

import styles from './Button.module.css';

const Button = ({
  children,
  className,
  disabled,
  Icon,
  isRound,
  label,
  onClick,
  size = ButtonSize.MEDIUM,
  stretch = false,
  type = ButtonType.DEFAULT,
}: ButtonProps): JSX.Element => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      disabled={disabled}
      className={c(
        styles.button,
        styles[type],
        styles[size],
        stretch ? styles.stretch : '',
        isRound ? styles.is_round : '',
        className
      )}
      onClick={handleClick}
      title={isRound ? label : undefined}
    >
      {Icon != null && <Icon className={styles.icon} />}
      {!isRound ? children || <span>{label}</span> : <></>}
    </button>
  );
};

export default Button;
