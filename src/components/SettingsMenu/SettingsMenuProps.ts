export const SettingsMenuPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type SettingsMenuProps = {
  className?: string;
  items?: JSX.Element[];
  position?: (typeof SettingsMenuPosition)[keyof typeof SettingsMenuPosition];
};
