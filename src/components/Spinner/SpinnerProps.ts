export const SpinnerType = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
});

export type SpinnerProps = {
  cover?: boolean;
  inverted?: boolean;
  label?: string;
  type?: (typeof SpinnerType)[keyof typeof SpinnerType];
};
