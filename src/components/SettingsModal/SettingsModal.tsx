import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

import { c } from '../../helpers/classNameHelpers';
import { hasClosestElement } from '../../helpers/htmlSelectorsHelpers';
import { IconVerticalDots } from '../Icons/Icons';
import { SettingsModalPosition } from './SettingsModalConstants';
import { SettingsModalProps } from './SettingsModalProps';

import styles from './SettingsModal.module.css';

export default function SettingsModal({
  className,
  items = [],
  position = SettingsModalPosition.LEFT,
}: SettingsModalProps): JSX.Element {
  const [openerWrapperId] = useState(crypto.randomUUID());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleClick = debounce((event: MouseEvent): void => {
      if (event.defaultPrevented) {
        return;
      }
      if (hasClosestElement(event, openerWrapperId)) {
        return;
      }

      setVisible(false);
    }, 100);

    window.document.body.addEventListener('click', handleClick, true);

    return () => {
      window.document.body.removeEventListener('click', handleClick);
    };
  }, [openerWrapperId]);

  const handleOpenerClick = (): void => {
    setVisible(!visible);
  };

  return (
    <div
      className={c(
        className,
        styles.settings_menu,
        visible ? styles.open : styles.close,
        styles[position]
      )}
      id={openerWrapperId}
    >
      <ul className={c(styles.menu)}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleOpenerClick} className={c(styles.opener)}>
        <IconVerticalDots className={c(styles.opener_icon)} />
      </button>
    </div>
  );
}
