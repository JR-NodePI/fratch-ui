import { c } from '../../../helpers/classNameHelpers';
import type { IconContainerProps } from '../components/IconContainerProps';
import * as Icons from '../Icons';

import styles from './IconList.module.css';

const IconList = ({ type }: Pick<IconContainerProps, 'type'>): JSX.Element => {
  const handleIconNameFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.select();
  };
  return (
    <div className={c(styles.icon_list)}>
      <ul>
        {Object.entries(Icons).map(([key, Icon]) => (
          <li key={key}>
            <label>
              <input
                onFocus={handleIconNameFocus}
                className={c(styles.icon_title)}
                value={key}
              />
              <Icon type={type} className={c(styles.story_icon)} />
            </label>
          </li>
        ))}
        <li>
          <span className={c(styles.icon_title)}>
            IconClose <br /> custom color by className
          </span>
          <Icons.IconClose
            className={c(styles.story_icon, styles.icon_custom_color)}
            type={type}
          />
        </li>
      </ul>
      <a href="https://flowbite.com/icons/">Icons from flowbite</a>
    </div>
  );
};

export default IconList;
