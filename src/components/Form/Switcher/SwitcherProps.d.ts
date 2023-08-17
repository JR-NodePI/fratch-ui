import { ReactNode } from 'react';

import { IconPlus as Icon } from '../../Icons/Icons';

export type SwitcherProps = {
  value?: boolean;
  className?: string;
  labelLeft?: ReactNode;
  labelRight?: ReactNode;
  title?: string;
  disabled?: boolean;
  onChange?: (switchOn: boolean) => void;
  IconOn?: typeof Icon;
  IconOff?: typeof Icon;
};
