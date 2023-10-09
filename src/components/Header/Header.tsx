import { c } from '../../helpers';
import { ICON_POSITION } from './HeaderConstants';
import { HeaderProps } from './HeaderProps';

import styles from './Header.module.css';

function Header({
  title,
  iconPosition = ICON_POSITION.LEFT,
  imgLogo,
}: HeaderProps): JSX.Element {
  return (
    <div className={c(styles.header)}>
      <h1>
        <span
          className={c(styles.icon, styles[iconPosition])}
          style={{ backgroundImage: `url(${imgLogo})` }}
        />
        {title}
      </h1>
    </div>
  );
}

export default Header;
