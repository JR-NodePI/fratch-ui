import { c } from '../../helpers/classNameHelpers';
import type { ButtonProps } from './ButtonProps';
import { ButtonSize, ButtonType } from './ButtonConstants';

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
        isRound ? styles.only_icon : '',
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
