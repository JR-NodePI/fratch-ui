export const ButtonType = Object.freeze({
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
});

export const ButtonSize = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
});

export interface ButtonProps {
  className?: string;
  label: string;
  onClick?: () => void;
  size?: (typeof ButtonSize)[keyof typeof ButtonSize];
  type?: (typeof ButtonType)[keyof typeof ButtonType];
}
