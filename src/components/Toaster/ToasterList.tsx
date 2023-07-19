import { useCallback, useState, type ReactNode } from 'react';
import ToasterListContext, { type Toaster } from './ToasterListContext';
import { v4 as uuid } from 'uuid';
import ToasterItem from './ToasterItem';
import { c } from '../../helpers/classNameHelpers';

import styles from './Toaster.module.css';
import { createPortal } from 'react-dom';

export default function ToasterList({ children }: { children: ReactNode }): JSX.Element {
  const [toasters, setToasters] = useState<Toaster[]>([]);

  const handleToasterClose = useCallback(
    (id: string): void => {
      setToasters(toasters.filter(toaster => toaster.id !== id));
    },
    [toasters]
  );

  const addToaster = useCallback((toaster: Toaster): void => {
    setToasters((prevToasters: Toaster[]) => [...prevToasters, { ...toaster, id: uuid() }]);
  }, []);

  return createPortal(
    <ToasterListContext.Provider value={{ toasters, addToaster }}>
      {toasters.length > 0 && (
        <div className={c(styles.toaster_list)}>
          {toasters.map((toaster, index) => (
            <ToasterItem key={index} onClose={handleToasterClose} {...toaster} />
          ))}
        </div>
      )}
      {children}
    </ToasterListContext.Provider>,
    document.body
  );
}
