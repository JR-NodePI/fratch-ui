import { c } from '../../helpers/classNameHelpers';
import styles from './Header.module.css';

function Header({
  title,
  iconSrc,
  iconPosition = 'left',
}: {
  title: string;
  iconSrc?: string;
  iconPosition: 'left' | 'right';
}): JSX.Element {
  return (
    <div className={c(styles.header)}>
      <h1>
        {iconSrc && (
          <img className={c(styles.icon, styles[iconPosition])} src={iconSrc} alt={title} />
        )}
        {title}
      </h1>
    </div>
  );
}

export default Header;
