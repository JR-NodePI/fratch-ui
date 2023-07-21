import { createPortal } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
import { ModalCloseTypes, type ModalProps, ModalTypes, type ModalCloseType } from './ModalProps';
import Button from '../Button/Button';
import { v4 as uuid } from 'uuid';
import { c } from '../../helpers/classNameHelpers';

import styles from './Modal.module.css';
import { isAscendantEvenTargetByID } from '../../helpers/htmlSelectorsHelpers';

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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const close = useCallback((): void => {
    setIsTransitioning(true);
    setCssClassStatus(styles.close);

    setTimeout(() => {
      setCssClassStatus('');
      setMounted(false);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const open = useCallback((): void => {
    setIsTransitioning(true);
    setMounted(true);

    setTimeout(() => {
      onOpen?.();
      setCssClassStatus(styles.open);
      setIsTransitioning(false);
    }, 100);
  }, [onOpen]);

  useEffect(() => {
    visible ? open() : close();
  }, [close, open, visible]);

  const handleCloseTypes = (type: ModalCloseType = ModalCloseTypes.CLOSE): void => {
    if (isTransitioning) {
      return;
    }
    onClose?.(type);
    close();
  };

  const handleAccept = (): void => {
    handleCloseTypes(ModalCloseTypes.ACCEPT);
  };
  const handleCancel = (): void => {
    handleCloseTypes(ModalCloseTypes.CANCEL);
  };
  const handleOverflowClose = (event: React.MouseEvent): void => {
    if (!isAscendantEvenTargetByID(event.nativeEvent, id)) {
      handleCloseTypes(ModalCloseTypes.CANCEL);
    }
  };
  const handleOverflow = (): void => {
    handleCloseTypes(ModalCloseTypes.CANCEL);
  };

  const hasHeader = title || type === ModalTypes.INFO;
  const hasCloser = type !== ModalTypes.CONFIRM;
  const hasFooter = type !== ModalTypes.INFO;

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
            <h5 className={c(styles.title)}>{title}</h5>
            {hasCloser && (
              <button className={c(styles.closer)} onClick={handleOverflow}>
                ×
              </button>
            )}
          </header>
        )}
        <div className={c(styles.content)}>{children}</div>{' '}
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
              type="primary"
              label={acceptButtonLabel || (type === ModalTypes.CONFIRM ? 'OK' : 'Accept')}
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
