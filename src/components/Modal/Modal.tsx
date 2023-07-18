import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { ModalCloseTypes, type ModalProps, ModalTypes, type ModalCloseType } from './ModalProps';
import Button from '../Button/Button';
import { c } from '../../helpers/classNameHelpers';

import styles from './Modal.module.css';

export default function Modal({
  acceptButtonLabel,
  cancelButtonLabel,
  children,
  onClose,
  onOpen,
  title,
  type = ModalTypes.INFO,
  visible,
}: ModalProps): JSX.Element {
  const [cssClassStatus, setCssClassStatus] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const close = (): void => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setCssClassStatus(styles.close);

    setTimeout(() => {
      setCssClassStatus('');
      setMounted(false);
      setIsTransitioning(false);
    }, 500);
  };

  const open = (): void => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setMounted(true);

    setTimeout(() => {
      onOpen?.();
      setCssClassStatus(styles.open);
      setIsTransitioning(false);
    }, 100);
  };

  useEffect(() => {
    visible ? open() : close();
  }, [visible]);

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
  const handleClose = (): void => {
    handleCloseTypes(ModalCloseTypes.CANCEL);
  };

  const handleStopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
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
      onClick={hasCloser ? handleClose : undefined}
    >
      <section onClick={handleStopPropagation} className={c(styles.modal, styles[type])}>
        {hasHeader && (
          <header className={c(styles.header)}>
            <h5 className={c(styles.title)}>{title}</h5>
            {hasCloser && (
              <button className={c(styles.closer)} onClick={handleClose}>
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
