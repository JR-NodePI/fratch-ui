import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { debounce } from 'lodash';

import { c } from '../../helpers/classNameHelpers';
import { setStyleProperties } from '../../helpers/componentPropertiesHelpers';
import { hasClosestElement } from '../../helpers/htmlSelectorsHelpers';
import Button from '../Button/Button';
import ButtonCloser from '../ButtonCloser/ButtonCloser';
import {
  MODAL_CONFIRM_MAX_WIDTH,
  MODAL_MAX_WIDTH,
  MODAL_TIMEOUT_TO_CLOSE,
  MODAL_TIMEOUT_TO_OPEN,
  ModalCloseTypes,
  ModalTypes,
} from './ModalConstants';
import type { ModalCloseType, ModalProps } from './ModalProps';

import styles from './Modal.module.css';

function Modal({
  acceptButtonLabel,
  cancelButtonLabel,
  children,
  onClose,
  onOpen,
  title,
  type = ModalTypes.INFO,
  visible,
}: ModalProps): JSX.Element {
  const [id] = useState<string>(crypto.randomUUID());
  const [cssClassStatus, setCssClassStatus] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  const close = useCallback(
    (type?: ModalCloseType): void => {
      setCssClassStatus(() => {
        debounce(() => {
          setCssClassStatus('');
          setMounted(false);

          if (type && onClose) {
            onClose(type);
          }
        }, MODAL_TIMEOUT_TO_CLOSE)();

        return styles.close;
      });
    },
    [onClose]
  );

  const open = useCallback((): void => {
    setMounted(() => {
      debounce(() => {
        setCssClassStatus(styles.open);
      }, MODAL_TIMEOUT_TO_OPEN)();

      onOpen?.();
      return true;
    });
  }, [onOpen]);

  useEffect(() => {
    if (visible) {
      open();
    }
  }, [open, visible]);

  const handleAccept = (event: React.MouseEvent): void => {
    event.preventDefault();
    close(ModalCloseTypes.ACCEPT);
  };

  const handleCancel = (event: React.MouseEvent): void => {
    event.preventDefault();
    close(ModalCloseTypes.CANCEL);
  };

  const handleOverflow = (event: React.MouseEvent): void => {
    event.preventDefault();
    close(ModalCloseTypes.CLOSE);
  };

  const handleOverflowClose = (event: React.MouseEvent): void => {
    event.preventDefault();
    if (!hasClosestElement(event.nativeEvent, id)) {
      close(ModalCloseTypes.CLOSE);
    }
  };

  const hasHeader = Boolean(title);
  const hasCloser = type !== ModalTypes.CONFIRM;
  const hasFooter = type !== ModalTypes.INFO;
  const buttonAcceptType = type === ModalTypes.ACCEPT ? 'primary' : 'tertiary';

  if (!mounted) {
    return <></>;
  }

  return createPortal(
    <div
      ref={setStyleProperties({
        '--modal-timeout-to-close': `${MODAL_TIMEOUT_TO_CLOSE}ms`,
        '--modal-timeout-to-open': `${MODAL_TIMEOUT_TO_OPEN}ms`,
        '--modal-max-width': `${MODAL_MAX_WIDTH}px`,
        '--modal-confirm-max-width': `${MODAL_CONFIRM_MAX_WIDTH}px`,
      })}
      className={c(styles.modal_overflow, cssClassStatus)}
      onClick={hasCloser ? handleOverflowClose : undefined}
      aria-label={hasCloser ? 'Close modal' : ''}
    >
      <section id={id} className={c(styles.modal, styles[type])}>
        {hasHeader && (
          <header className={c(styles.header)}>
            <h5 className={c(styles.title)}>{title}</h5>
          </header>
        )}
        {hasCloser && (
          <ButtonCloser
            onClick={handleOverflow}
            className={c(styles.button_closer)}
            title="Close"
          />
        )}
        <div className={c(styles.content)}>{children}</div>
        {hasFooter && (
          <footer className={c(styles.footer)}>
            {type === ModalTypes.CONFIRM && (
              <Button
                onClick={handleCancel}
                className={c(styles.button)}
                label={cancelButtonLabel || 'Cancel'}
                size="small"
              />
            )}

            <Button
              onClick={handleAccept}
              className={c(styles.button)}
              type={buttonAcceptType}
              label={
                acceptButtonLabel ||
                (type === ModalTypes.CONFIRM ? 'OK' : 'Accept')
              }
              size="small"
            />
          </footer>
        )}
      </section>
    </div>,
    document.body
  );
}

export default Modal;
