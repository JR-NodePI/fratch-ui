import { c } from "../../helpers/classNameHelpers";

import styles from "./Spinner.module.css";

const Spinner = (): JSX.Element => {
  return (
    <svg className={c(styles.spinner)} viewBox="0 0 50 50">
      <circle
        className={c(styles.spinner_path)}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  );
};

export default Spinner;
