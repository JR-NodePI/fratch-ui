import { SettingsModalPosition } from './SettingsModalConstants';

export type SettingsModalProps = {
  className?: string;
  items?: JSX.Element[];
  position?: (typeof SettingsModalPosition)[keyof typeof SettingsModalPosition];
  visible?: boolean;
  onClose?: () => void;
};
