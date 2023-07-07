import { c } from '../../../helpers/classNameHelpers';
import IconArrowDown from '../IconArrowDown';
import IconClose from '../IconClose';
import type { IconProps } from '../components/IconProps';

import styles from './IconList.module.css';

const IconList = ({ type }: Pick<IconProps, 'type'>): JSX.Element => (
  <div className={c(styles.icon_list)}>
    <ul>
      <li>
        <span className={c(styles.icon_title)}>IconArrowDown</span>
        <IconArrowDown type={type} />
      </li>
      <li>
        <span className={c(styles.icon_title)}>IconClose</span>
        <IconClose type={type} />
      </li>
      <li>
        <span className={c(styles.icon_title)}>
          IconClose <br /> custom color
        </span>
        <IconClose className={c(styles.icon_custom_color)} type={type} />
      </li>
    </ul>
  </div>
);

export default IconList;
