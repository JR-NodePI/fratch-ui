import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { c } from '../../helpers';
import ToasterItem from './ToasterItem';
import ToasterListContext from './ToasterListContext';
import type { Toaster, ToasterProviderProps } from './ToasterProps';

import styles from './Toaster.module.css';

export default function ToasterProvider({
  children,
  listClassName,
  itemClassName,
}: ToasterProviderProps): JSX.Element {
  const [portalId] = useState<string>(crypto.randomUUID());
  const [toasters, setToasters] = useState<Toaster[]>([]);

  const handleToasterClose = (id: string): void => {
    setToasters(toasters.filter(toaster => toaster.id !== id));
  };

  const addToaster = useCallback((toaster: Toaster): void => {
    setToasters((prevToasters: Toaster[]) => [
      ...prevToasters,
      { ...toaster, id: crypto.randomUUID() },
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
