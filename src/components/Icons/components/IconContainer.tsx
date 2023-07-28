import { c } from '../../../helpers/classNameHelpers';
import { IconType } from './IconConstants';
import { IconContainerProps } from './IconContainerProps';

import styles from './IconContainer.module.css';

const IconContainer = ({
  children,
  className,
  type = IconType.PRIMARY,
}: IconContainerProps): JSX.Element =>
  children({
    iconClassName: c(styles.icon, styles[type], className),
  });

export default IconContainer;
