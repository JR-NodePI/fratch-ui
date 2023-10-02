import type { IconPlus as Icon } from '../Icons/Icons';
import type Spinner from '../Spinner/Spinner';
import { ButtonSize, ButtonType } from './ButtonConstants';

export interface ButtonProps {
  children?: string;
  className?: string;
  disabled?: boolean;
  Icon?: typeof Icon | typeof Spinner;
  isRound?: boolean;
  label?: string;
  onClick?: (event: React.MouseEvent) => void;
  size?: (typeof ButtonSize)[keyof typeof ButtonSize];
  stretch?: boolean;
  type?: (typeof ButtonType)[keyof typeof ButtonType];
}
