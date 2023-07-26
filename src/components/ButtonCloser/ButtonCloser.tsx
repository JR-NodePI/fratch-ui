import { c } from '../../helpers/classNameHelpers';

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
      {'\u00D7'}
    </button>
  );
}
