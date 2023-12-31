import { IconType } from './IconConstants';

export type RenderSvgProps = { iconClassName?: string };

export type IconContainerProps = {
  children: ({
    iconClassName,
  }: RenderSvgProps) => React.ReactElement<JSX.IntrinsicElements['svg']>;
  className?: string;
  type?: (typeof IconType)[keyof typeof IconType];
};
