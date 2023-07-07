export const IconType = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
});

export type IconProps = {
  svg: React.ReactElement<JSX.IntrinsicElements['svg']>;
  className?: string;
  type?: (typeof IconType)[keyof typeof IconType];
};
