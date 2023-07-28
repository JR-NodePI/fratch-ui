import { SpinnerType } from './SpinnerConstants';

export type SpinnerProps = {
  cover?: boolean;
  inverted?: boolean;
  label?: string;
  type?: (typeof SpinnerType)[keyof typeof SpinnerType];
};
