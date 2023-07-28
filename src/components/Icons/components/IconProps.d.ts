import { IconType } from './IconConstants';

export type IconProps = {
  svg: React.ReactElement<JSX.IntrinsicElements['svg']>;
  className?: string;
  type?: (typeof IconType)[keyof typeof IconType];
};
