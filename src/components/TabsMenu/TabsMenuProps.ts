import { CSSProperties } from 'react';

import { IconCheck as Icon } from '../Icons/Icons';

export type Tab = {
  active?: boolean;
  color?: CSSProperties['color'];
  label?: string;
  Icon?: typeof Icon;
};

export type TabsMenuProps = {
  className?: string;
  editable?: boolean;
  removable?: boolean;
  addable?: boolean;
  newTabTemplate?: Pick<Tab, 'label' | 'Icon' | 'color'>;
  onTabAdd?: (tabData: Pick<Tab, 'label'> & { index: number }) => void;
  onTabClick?: (tabData: Pick<Tab, 'label'> & { index: number }) => void;
  onTabEdit?: (tabData: Pick<Tab, 'label'> & { index: number }) => void;
  onTabRemove?: (tabData: { index: number }) => void;
  onTabsChange?: (tabs: Tab[]) => void;
  tabs?: Tab[];
};
