import { useEffect, useState } from 'react';

import { c } from '../../helpers/classNameHelpers';
import { isAscendantEvenTargetByID } from '../../helpers/htmlSelectorsHelpers';
import { IconVerticalDots } from '../Icons/Icons';
import { SettingsMenuPosition } from './SettingsMenuConstants';
import { SettingsMenuProps } from './SettingsMenuProps';

import styles from './SettingsMenu.module.css';

export default function SettingsMenu({
  className,
  items = [],
  position = SettingsMenuPosition.LEFT,
}: SettingsMenuProps): JSX.Element {
  const [openerWrapperId] = useState(crypto.randomUUID());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (!isAscendantEvenTargetByID(event, openerWrapperId)) {
        setVisible(false);
      }
    };
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
