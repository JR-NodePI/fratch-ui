import React from 'react';

export interface Toaster {
  id?: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  nlToBr?: boolean;
}

export interface ToasterListProviderProps {
  addToaster?: (toaster: Toaster) => void;
  toasters?: Toaster[];
}

const ToasterListContext = React.createContext<ToasterListProviderProps>({});
ToasterListContext.displayName = 'ToasterListContext';

export default ToasterListContext;
