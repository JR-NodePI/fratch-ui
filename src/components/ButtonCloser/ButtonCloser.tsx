import { c } from '../../helpers/classNameHelpers';

import styles from './ButtonCloser.module.css';

export default function ButtonCloser({
  className,
  onClick,
  title,
}: {
  className?: string;
  onClick: () => void;
  title?: string;
}): JSX.Element {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      className={c(styles.button_closer, className)}
      onClick={handleClick}
      title={title}
    >
      {'\u00D7'}
    </button>
  );
}
