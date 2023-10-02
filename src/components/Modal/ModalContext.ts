import React from 'react';

import type { ModalContextProps } from './ModalProps';

const ModalContext = React.createContext<ModalContextProps>({
  showModalAccept: () => {},
  showModalConfirm: () => {},
  showModalInfo: () => {},
});
ModalContext.displayName = 'ModalContext';

export default ModalContext;
