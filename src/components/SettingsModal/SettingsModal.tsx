import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

import { c } from '../../helpers/classNameHelpers';
import { hasClosestElement } from '../../helpers/htmlSelectorsHelpers';
import { IconVerticalDots } from '../Icons';
import {
  SETTINGS_MODAL_TIMEOUT_TO_CLOSE,
  SettingsModalPosition,
} from './SettingsModalConstants';
import { SettingsModalProps } from './SettingsModalProps';

import styles from './SettingsModal.module.css';

export default function SettingsModal({
  className,
  items = [],
  position = SettingsModalPosition.LEFT,
  visible,
  onClose,
}: SettingsModalProps): JSX.Element {
  const [openerWrapperId] = useState(crypto.randomUUID());
  const [innerVisible, setInnerVisible] = useState(visible);

  useEffect(() => {
    setInnerVisible(visible);
  }, [visible]);

  useEffect(() => {
    const handleClick = debounce((event: MouseEvent): void => {
      if (event.defaultPrevented) {
        return;
      }
      if (hasClosestElement(event, openerWrapperId)) {
        return;
      }

      setInnerVisible(false);
      onClose?.();
    }, SETTINGS_MODAL_TIMEOUT_TO_CLOSE);

    window.document.body.addEventListener('click', handleClick, true);

    return () => {
      window.document.body.removeEventListener('click', handleClick);
    };
  }, [openerWrapperId, onClose]);

  const handleOpenerClick = (): void => {
    setInnerVisible(!innerVisible);
  };

  return (
    <div
      className={c(
        className,
        styles.settings_menu,
        innerVisible ? styles.open : styles.close,
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
