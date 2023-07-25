import React from 'react';

export const ToasterType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export interface Toaster {
  id?: string;
  title?: string;
  message: string;
  type: (typeof ToasterType)[keyof typeof ToasterType];
  duration?: number;
  nlToBr?: boolean;
}

export interface ToasterListProviderProps {
  addToaster: (toaster: Toaster) => void;
  toasters: Toaster[];
}

const ToasterListContext = React.createContext<ToasterListProviderProps>({
  addToaster: (): void => undefined,
  toasters: [],
});
ToasterListContext.displayName = 'ToasterListContext';

export default ToasterListContext;
