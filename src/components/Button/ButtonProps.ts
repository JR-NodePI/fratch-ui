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

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  label: string;
  onClick?: () => void;
}
