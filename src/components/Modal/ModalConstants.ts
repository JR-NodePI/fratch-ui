export const ModalTypes = {
  ACCEPT: 'accept',
  CONFIRM: 'confirm',
  INFO: 'info',
} as const;

export const ModalCloseTypes = {
  ACCEPT: 'accept',
  CANCEL: 'cancel',
  CLOSE: 'close',
} as const;

export const MODAL_TIMEOUT_TO_CLOSE = 500;
export const MODAL_TIMEOUT_TO_OPEN = 200;
export const MODAL_MAX_WIDTH = 600;
export const MODAL_CONFIRM_MAX_WIDTH = 460;
