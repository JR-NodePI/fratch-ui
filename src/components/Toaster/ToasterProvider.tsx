import { type ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import { v4 as uuid } from 'uuid';

import { c } from '../../helpers/classNameHelpers';
import ToasterItem from './ToasterItem';
import ToasterListContext, { type Toaster } from './ToasterListContext';

import styles from './Toaster.module.css';

export default function ToasterProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [toasters, setToasters] = useState<Toaster[]>([]);

  const handleToasterClose = useCallback(
    (id: string): void => {
      setToasters(toasters.filter(toaster => toaster.id !== id));
    },
    [toasters]
  );

  const addToaster = useCallback((toaster: Toaster): void => {
    setToasters((prevToasters: Toaster[]) => [
      ...prevToasters,
      { ...toaster, id: uuid() },
    ]);
  }, []);

  console.log('>>>----->> toasters ', toasters);

  return (
    <ToasterListContext.Provider value={{ toasters, addToaster }}>
      {toasters.length > 0 &&
        createPortal(
          <div className={c(styles.toaster_list)}>
            {toasters.map(toaster => (
              <ToasterItem
                key={toaster.id}
                onClose={handleToasterClose}
                {...toaster}
              />
            ))}
          </div>,
          document.body,
          uuid()
        )}
      {children}
    </ToasterListContext.Provider>
  );
}
