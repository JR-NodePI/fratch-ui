import { ICON_POSITION } from './HeaderConstants';

export type HeaderProps = {
  title?: string;
  iconPosition?: (typeof ICON_POSITION)[keyof typeof ICON_POSITION];
  imgLogo?: string;
};
