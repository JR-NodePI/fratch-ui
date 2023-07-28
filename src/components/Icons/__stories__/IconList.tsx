import { c } from '../../../helpers/classNameHelpers';
import type { IconContainerProps } from '../components/IconContainerProps';
import * as Icons from '../Icons';

import styles from './IconList.module.css';

const IconList = ({ type }: Pick<IconContainerProps, 'type'>): JSX.Element => (
  <div className={c(styles.icon_list)}>
    <ul>
      {Object.entries(Icons).map(([key, Icon]) => (
        <li key={key}>
          <span className={c(styles.icon_title)}>{key}</span>
          <Icon type={type} className={c(styles.story_icon)} />
        </li>
      ))}
      <li>
        <span className={c(styles.icon_title)}>
          ∫ IconClose <br /> custom color
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

export default IconList;
