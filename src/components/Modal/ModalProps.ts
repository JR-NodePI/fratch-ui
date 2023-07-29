import { ReactNode } from 'react';

import { ModalCloseTypes, ModalTypes } from './ModalConstants';

export type ModalCloseType =
  (typeof ModalCloseTypes)[keyof typeof ModalCloseTypes];

export type ModalProps = {
  acceptButtonLabel?: string;
  cancelButtonLabel?: string;
  children: ReactNode;
  onClose?: (type: ModalCloseType) => void;
  onOpen?: () => void;
  title?: ReactNode;
  type?: (typeof ModalTypes)[keyof typeof ModalTypes];
  visible?: boolean;
};
