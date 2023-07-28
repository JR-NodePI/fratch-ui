import { c } from '../../../helpers/classNameHelpers';
import { IconType } from './IconConstants';
import { IconProps } from './IconProps';

import styles from './IconContainer.module.css';

const IconContainer = ({
  children,
  className,
  type = IconType.PRIMARY,
}: IconProps): JSX.Element =>
  children({
    iconClassName: c(styles.icon, styles[type], className),
  });

export default IconContainer;
