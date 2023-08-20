import { ToasterType } from './ToasterConstants';

export interface Toaster {
  id?: string;
  title?: string;
  message?: string;
  type: (typeof ToasterType)[keyof typeof ToasterType];
  duration?: number;
  nlToBr?: boolean;
  stoppable?: boolean;
}

export type ToasterListProviderProps = {
  addToaster: (toaster: Toaster) => void;
  toasters: Toaster[];
};

export type ToasterItemProps = {
  onClose: (id: string) => void;
  toaster: Toaster;
  className?: string;
};

export type ToasterProviderProps = {
  children: ReactNode;
  listClassName?: string;
  itemClassName?: string;
};
