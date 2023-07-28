import { c } from '../../helpers/classNameHelpers';
import IconClose from '../Icons/IconClose';

import styles from './ButtonCloser.module.css';

export default function ButtonCloser({
  className,
  onClick,
  title,
}: {
  className?: string;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}): JSX.Element {
  return (
    <button
      className={c(styles.button_closer, className)}
      onClick={onClick}
      title={title}
    >
      <IconClose className={c(styles.icon)} />
      <i>{title}</i>
    </button>
  );
}
