import { c } from '../../../helpers/classNameHelpers';

import styles from './LeftLabeledField.module.css';

function LeftLabeledField({
  className,
  field,
  label,
}: {
  className?: string;
  field: JSX.Element;
  label: JSX.Element;
}): JSX.Element {
  return (
    <div className={c(styles.wrapper, className)}>
      <div className={c(styles.label_container)}>{label}</div>
      <div className={c(styles.field_container)}>{field}</div>
    </div>
  );
}

export default LeftLabeledField;
