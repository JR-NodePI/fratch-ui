import { type ReactNode, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { v4 as uuid } from 'uuid';

import { c } from '../../helpers/classNameHelpers';
import ToasterItem from './ToasterItem';
import ToasterListContext, { type Toaster } from './ToasterListContext';

import styles from './Toaster.module.css';

export default function ToasterProvider({
  children,
  listClassName,
  itemClassName,
}: {
  children: ReactNode;
  listClassName?: string;
  itemClassName?: string;
}): JSX.Element {
  const [portalId] = useState<string>(uuid());
  const [toasters, setToasters] = useState<Toaster[]>([]);

  const handleToasterClose = (id: string): void => {
    setToasters(toasters.filter(toaster => toaster.id !== id));
  };

  const addToaster = useCallback((toaster: Toaster): void => {
    setToasters((prevToasters: Toaster[]) => [
      ...prevToasters,
      { ...toaster, id: uuid() },
    ]);
  }, []);

  const toasterListRef = useRef<HTMLDivElement>(null);

  return (
    <ToasterListContext.Provider value={{ toasters, addToaster }}>
      {createPortal(
        toasters.length > 0 && (
          <div
            ref={toasterListRef}
            className={c(styles.toaster_list, listClassName)}
          >
            {toasters.map(toaster => (
              <ToasterItem
                className={c(itemClassName)}
                key={toaster.id}
                onClose={handleToasterClose}
                toaster={toaster}
              />
            ))}
          </div>
        ),
        document.body,
        portalId
      )}
      {children}
    </ToasterListContext.Provider>
  );
}
