import { memo, useCallback, useEffect, useState } from 'react';

import { c } from '../../helpers/classNameHelpers';
import { nlToNodes } from './ToasterFormatHelper';
import { type Toaster } from './ToasterListContext';

import styles from './Toaster.module.css';

const ToasterItem = memo(function ({
  duration,
  id,
  message,
  nlToBr,
  onClose,
  title,
  type,
}: Toaster & { onClose: (id: string) => void }): JSX.Element {
  const [cssClassStatus, setCssClassStatus] = useState<string>('');

  const close = useCallback((): void => {
    if (id) {
      setTimeout(() => {
        onClose(id);
      }, 300);
    }
    setCssClassStatus(styles.close);
  }, [id, onClose]);

  useEffect(() => {
    if (duration) {
      setTimeout(close, duration);
    }
    setCssClassStatus(styles.open);
  }, [close, duration]);

  const finalMessage = nlToBr ? nlToNodes(message) : message;
  const toMuchDuration = !duration || duration >= 3000;

  console.log('>>>----->> id', id);
  return (
    <div key={id} className={c(styles.toaster, styles[type], cssClassStatus)}>
      {title && <h5 className={c(styles.title)}>{title}</h5>}
      <p className={c(styles.message)}>{finalMessage}</p>
      {toMuchDuration && (
        <button className={c(styles.closer)} onClick={close}>
          ×
        </button>
      )}
    </div>
  );
});

export default ToasterItem;
