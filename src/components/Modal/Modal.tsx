import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { debounce } from 'lodash';
import { v4 as uuid } from 'uuid';

import { c } from '../../helpers/classNameHelpers';
import { isAscendantEvenTargetByID } from '../../helpers/htmlSelectorsHelpers';
import Button from '../Button/Button';
import {
  type ModalCloseType,
  ModalCloseTypes,
  type ModalProps,
  ModalTypes,
} from './ModalProps';

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
  const [id] = useState<string>(uuid());
  const [cssClassStatus, setCssClassStatus] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  const close = useCallback((): void => {
    setCssClassStatus(() => {
      debounce(() => {
        setCssClassStatus('');
        setMounted(false);
      }, 500)();

      return styles.close;
    });
  }, []);

  const open = useCallback((): void => {
    setMounted(() => {
      debounce(() => {
        setCssClassStatus(styles.open);
      }, 1)();

      onOpen?.();
      return true;
    });
  }, [onOpen]);

  useEffect(() => {
    visible ? open() : close();
  }, [close, open, visible]);

  const handleAccept = (): void => {
    close();
    onClose?.(ModalCloseTypes.ACCEPT);
  };

  const handleCancel = (): void => {
    close();
    onClose?.(ModalCloseTypes.CANCEL);
  };

  const handleOverflow = (): void => {
    close();
    onClose?.(ModalCloseTypes.CLOSE);
  };

  const handleOverflowClose = (event: React.MouseEvent): void => {
    if (!isAscendantEvenTargetByID(event.nativeEvent, id)) {
      close();
      onClose?.(ModalCloseTypes.CLOSE);
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
      className={c(styles.modal_overflow, cssClassStatus)}
      onClick={hasCloser ? handleOverflowClose : undefined}
    >
      <section id={id} className={c(styles.modal, styles[type])}>
        {hasHeader && (
          <header className={c(styles.header)}>
            <h5 className={c(styles.title)}>{title}</h5>{' '}
          </header>
        )}
        {hasCloser && (
          <button className={c(styles.closer)} onClick={handleOverflow}>
            ×
          </button>
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
