import { useEffect, useState } from 'react';

import { c } from '../../helpers/classNameHelpers';
import ButtonCloser from '../ButtonCloser/ButtonCloser';
import IconError from '../Icon/IconError';
import IconInfo from '../Icon/IconInfo';
import IconSuccess from '../Icon/IconSuccess';
import IconWarning from '../Icon/IconWarning';
import { ToasterType } from './ToasterConstants';
import { nlToNodes } from './ToasterFormatHelpers';
import { type Toaster } from './ToasterListContextProps';

import styles from './Toaster.module.css';

const renderIconByType = (type: string): JSX.Element => {
  switch (type) {
    case ToasterType.SUCCESS:
      return <IconSuccess type={type} className={c(styles.icon)} />;
    case ToasterType.ERROR:
      return <IconError type={type} className={c(styles.icon)} />;
    case ToasterType.WARNING:
      return <IconWarning type={type} className={c(styles.icon)} />;
    case ToasterType.INFO:
      return <IconInfo type={type} className={c(styles.icon)} />;
    default:
      return <></>;
  }
};

export default function ToasterItem({
  onClose,
  toaster,
  className,
}: {
  onClose: (id: string) => void;
  toaster: Toaster;
  className?: string;
}): JSX.Element {
  const { duration, id, message, nlToBr, title, type } = toaster;

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
    if (duration) {
      timeoutId = setTimeout(() => {
        setMustClose(true);
      }, duration);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration]);

  const handleClose = () => {
    setMustClose(true);
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

  const finalMessage = nlToBr ? nlToNodes(message) : message;
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
      <p className={c(styles.message)}>{finalMessage}</p>
      {toMuchDuration && <ButtonCloser onClick={handleClose} />}
    </div>
  );
}
