import { c } from '../../helpers/classNameHelpers';
import styles from './Header.module.css';

function Header({
  title,
  iconSrc,
}: {
  title: string;
  iconSrc?: string;
}): JSX.Element {
  return (
    <div className={c(styles.header)}>
      <h1>
        {iconSrc && (
          <img className={c(styles.icon)} src={iconSrc} alt={title} />
        )}
        {title}
      </h1>
    </div>
  );
}

export default Header;
