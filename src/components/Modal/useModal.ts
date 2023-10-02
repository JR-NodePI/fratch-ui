import { useContext } from 'react';

import ModalContext from './ModalContext';
import type { ModalContextProps } from './ModalProps';

export default function useModal(): ModalContextProps {
  return useContext(ModalContext);
}
