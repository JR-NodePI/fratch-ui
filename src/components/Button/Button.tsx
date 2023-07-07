import { c } from "../../helpers/classNameHelpers";

import styles from "./Button.module.css";
import { ButtonSizes, ButtonTypes } from "./ButtonProps";
import type { ButtonProps } from "./ButtonProps";

const Button = ({ label, type, size, onClick }: ButtonProps): JSX.Element => {
  const classNameByType =
    type === ButtonTypes.SECONDARY
      ? styles.secondary
      : type === ButtonTypes.TERTIARY
      ? styles.tertiary
      : styles.primary;

  const classNameBySize =
    size === ButtonSizes.LARGE
      ? styles.large
      : size === ButtonSizes.SMALL
      ? styles.small
      : styles.medium;

  return (
    <button
      className={c([styles.default, classNameByType, classNameBySize])}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
