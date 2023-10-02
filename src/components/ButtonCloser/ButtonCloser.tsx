import { c } from '../../helpers/classNameHelpers';
import { IconClose } from '../Icons/Icons';
import { type ButtonCloserProps } from './ButtonCloserProps';

import styles from './ButtonCloser.module.css';

export default function ButtonCloser({
  className,
  onClick,
  title,
}: ButtonCloserProps): JSX.Element {
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
