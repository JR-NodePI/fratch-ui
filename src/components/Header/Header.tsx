import iconImg from '../../assets/logo.png';
import { c } from '../../helpers/classNameHelpers';
import { ICON_POSITION } from './HeaderConstants';
import { HeaderProps } from './HeaderProps';

import styles from './Header.module.css';

function Header({
  title,
  iconPosition = ICON_POSITION.LEFT,
}: HeaderProps): JSX.Element {
  return (
    <div className={c(styles.header)}>
      <h1>
        <img
          className={c(styles.icon, styles[iconPosition])}
          src={iconImg}
          alt={title}
        />
        {title}
      </h1>
    </div>
  );
}

export default Header;
