import { useEffect, useState } from 'react';

import { c } from '../../helpers/classNameHelpers';
import ButtonCloser from '../ButtonCloser/ButtonCloser';
import {
  IconError,
  IconInfo,
  IconPin,
  IconSuccess,
  IconWarning,
} from '../Icons/Icons';
import { ToasterType } from './ToasterConstants';
import { nlToNodes } from './ToasterFormatHelpers';
import { ToasterItemProps } from './ToasterProps';

import styles from './Toaster.module.css';

const renderIconByType = (type: string): JSX.Element => {
  const { SUCCESS, ERROR, WARNING, INFO } = ToasterType;
  switch (type) {
    case SUCCESS:
      return <IconSuccess type={SUCCESS} className={c(styles.icon)} />;
    case ERROR:
      return <IconError type={ERROR} className={c(styles.icon)} />;
    case WARNING:
      return <IconWarning type={WARNING} className={c(styles.icon)} />;
    case INFO:
    default:
      return <IconInfo type={INFO} className={c(styles.icon)} />;
  }
};

export default function ToasterItem({
  onClose,
  toaster,
  className,
}: ToasterItemProps): JSX.Element {
  const { duration, id, message, nlToBr, title, type, stoppable } = toaster;

  const [pinned, setPinned] = useState<boolean>(false);
  const [mustClose, setMustClose] = useState<boolean>(false);
  const [cssClassStatus, setCssClassStatus] = useState<string>('');

  useEffect(() => {
    setCssClassStatus(styles.open);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (mustClose && id) {
      setCssClassStatus(styles.close);
      timeoutId = setTimeout(() => {
        onClose(id);
      }, 300);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [mustClose, id, onClose]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (duration && !pinned) {
      timeoutId = setTimeout(() => {
        setMustClose(true);
      }, duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, pinned]);

  const handleClose = () => {
    setMustClose(true);
  };

  const handlePin = (): void => {
    setPinned(!pinned);
  };

  const handleRef = (node: HTMLDivElement | null): void => {
    if (!node) {
      return;
    }

    const itemRect = node?.getBoundingClientRect();

    if (itemRect) {
      node.style.setProperty('height', `${itemRect.height}px`);
    }
  };

  const finalMessage = nlToBr && message ? nlToNodes(message) : message;
  const toMuchDuration = !duration || duration >= 3000;

  return (
    <div
      key={id}
      ref={handleRef}
      className={c(
        styles.toaster_item,
        styles[type],
        className,
        cssClassStatus
      )}
    >
      {renderIconByType(type)}
      {title && <h5 className={c(styles.title)}>{title}</h5>}
      {message && <p className={c(styles.message)}>{finalMessage}</p>}
      {stoppable && toMuchDuration && (
        <button
          onClick={handlePin}
          className={c(styles.pin_button, pinned ? styles.pinned : '')}
        >
          <IconPin className={c(styles.pin_button_icon)} />
          <i>pin</i>
        </button>
      )}
      {toMuchDuration && <ButtonCloser title="close" onClick={handleClose} />}
    </div>
  );
}
