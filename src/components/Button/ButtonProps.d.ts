import { IconPlus as Icon } from '../Icon/Icons';
import { ButtonSize, ButtonType } from './ButtonConstants';

export interface ButtonProps {
  children?: string;
  className?: string;
  disabled?: boolean;
  Icon?: typeof Icon;
  isRound?: boolean;
  label?: string;
  onClick?: () => void;
  size?: (typeof ButtonSize)[keyof typeof ButtonSize];
  stretch?: boolean;
  type?: (typeof ButtonType)[keyof typeof ButtonType];
}
