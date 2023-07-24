import { useEffect, useState } from 'react';

import { c } from '../../helpers/classNameHelpers';
import ButtonCloser from '../ButtonCloser/ButtonCloser';
import { nlToNodes } from './ToasterFormatHelper';
import { type Toaster } from './ToasterListContext';

import styles from './Toaster.module.css';

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
      className={c(styles.toaster, styles[type], className, cssClassStatus)}
    >
      {title && <h5 className={c(styles.title)}>{title}</h5>}
      <p className={c(styles.message)}>{finalMessage}</p>
      {toMuchDuration && <ButtonCloser onClick={handleClose} />}
    </div>
  );
}
