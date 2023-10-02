import { ReactNode } from 'react';

import { ModalCloseTypes, ModalTypes } from './ModalConstants';

export type ModalType = (typeof ModalTypes)[keyof typeof ModalTypes];

export type ModalCloseType =
  (typeof ModalCloseTypes)[keyof typeof ModalCloseTypes];

export type ModalProps = {
  acceptButtonLabel?: string;
  cancelButtonLabel?: string;
  children: ReactNode;
  onClose?: (type: ModalCloseType) => void;
  onOpen?: () => void;
  title?: ReactNode;
  type?: ModalTypes;
  visible?: boolean;
};

export type ShowModalProps = Omit<
  ModalProps,
  'children' | 'type' | 'visible'
> & { content: ReactNode };

export type ModalContextProps = {
  showModalAccept: (props: ShowModalProps) => void;
  showModalConfirm: (props: ShowModalProps) => void;
  showModalInfo: (props: ShowModalProps) => void;
};
