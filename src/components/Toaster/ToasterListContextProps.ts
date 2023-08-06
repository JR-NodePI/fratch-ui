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

export interface ToasterListProviderProps {
  addToaster: (toaster: Toaster) => void;
  toasters: Toaster[];
}
