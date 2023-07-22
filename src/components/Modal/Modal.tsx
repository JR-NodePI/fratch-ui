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

  const close = useCallback(
    (type: ModalCloseType): void => {
      setCssClassStatus(() => {
        debounce(() => {
          setCssClassStatus('');
          setMounted(false);
        }, 500)();

        onClose?.(type);
        return styles.close;
      });
    },
    [onClose]
  );

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
    visible ? open() : close(ModalCloseTypes.CANCEL);
  }, [close, open, visible]);

  const handleAccept = (): void => {
    close(ModalCloseTypes.ACCEPT);
  };

  const handleCancel = (): void => {
    close(ModalCloseTypes.CANCEL);
  };

  const handleOverflow = (): void => {
    close(ModalCloseTypes.CLOSE);
  };

  const handleOverflowClose = (event: React.MouseEvent): void => {
    if (!isAscendantEvenTargetByID(event.nativeEvent, id)) {
      close(ModalCloseTypes.CLOSE);
    }
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
