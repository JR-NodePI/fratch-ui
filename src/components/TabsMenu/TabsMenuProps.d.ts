import { CSSProperties } from 'react';

import { IconCheck as Icon } from '../Icons';

export type Tab = {
  active?: boolean;
  color?: CSSProperties['color'];
  label?: string;
  Icon?: typeof Icon;
};

export type TabEvent = Pick<Tab, 'label' | 'color' | 'Icon'> & {
  index: number;
};

export type TabsMenuProps = {
  addable?: boolean;
  className?: string;
  editable?: boolean;
  newTabTemplate?: Pick<Tab, 'label' | 'Icon' | 'color'>;
  onTabAdd?: (tabData: TabEvent) => void;
  onTabClick?: (tabData: TabEvent) => void;
  onTabEdit?: (tabData: TabEvent) => void;
  onTabRemove?: (tabData: TabEvent) => void;
  onTabsChange?: (tabs: Tab[]) => void;
  removable?: boolean;
  tabs?: Tab[];
  tabsDefault?: Tab[];
};
