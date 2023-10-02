import { c } from '../../helpers/classNameHelpers';
import { SpinnerType } from './SpinnerConstants';
import { type SpinnerProps } from './SpinnerProps';

import styles from './Spinner.module.css';

const Spinner = ({
  cover,
  inverted,
  label,
  type = SpinnerType.PRIMARY,
  className,
}: SpinnerProps): JSX.Element => {
  return (
    <div
      className={c(
        styles.spinner_container,
        cover ? styles.cover : '',
        inverted ? styles.inverted : '',
        styles[type],
        className
      )}
    >
      <svg className={c(styles.spinner)} viewBox="0 0 50 50">
        <circle
          className={c(styles.spinner_path)}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke="currentColor"
        ></circle>
      </svg>
      {label && <h5>{label}</h5>}
    </div>
  );
};

export default Spinner;
