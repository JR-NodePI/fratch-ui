import React from 'react';

import type { ToasterListProviderProps } from './ToasterProps';

const ToasterListContext = React.createContext<ToasterListProviderProps>({
  addToaster: (): void => undefined,
  toasters: [],
});
ToasterListContext.displayName = 'ToasterListContext';

export default ToasterListContext;
