import { SettingsMenuPosition } from './SettingsMenuConstants';

export type SettingsMenuProps = {
  className?: string;
  items?: JSX.Element[];
  position?: (typeof SettingsMenuPosition)[keyof typeof SettingsMenuPosition];
};
