import { c } from "../../helpers/classNameHelpers";

import styles from "./Button.module.css";

export const ButtonTypes = Object.freeze({
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
});

export const ButtonSizes = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

export type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];

interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  label: string;
  onClick?: () => void;
}

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
