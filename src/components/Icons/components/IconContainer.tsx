import { c } from '../../../helpers/classNameHelpers';
import { IconType } from './IconConstants';
import { IconProps } from './IconProps';

import styles from './IconContainer.module.css';

const IconContainer = ({
  svg,
  className,
  type = IconType.PRIMARY,
}: IconProps): JSX.Element => {
  return <div className={c(styles.icon, styles[type], className)}>{svg}</div>;
};

export default IconContainer;
