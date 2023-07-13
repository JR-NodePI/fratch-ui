import { c } from '../../helpers/classNameHelpers';
import styles from './Header.module.css';
import logo from '../../assets/logo.png';

function Header({
  title,
  iconSrc = logo,
}: {
  title: string;
  iconSrc?: string;
}): JSX.Element {
  return (
    <div className={c(styles.header)}>
      <h1>
        <img className={c(styles.icon)} src={iconSrc} alt={title} />
        {title}
      </h1>
    </div>
  );
}

export default Header;
