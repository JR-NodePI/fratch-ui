import { c } from '../../../helpers/classNameHelpers';

import styles from './LeftLabeledField.module.css';

function LeftLabeledField({
  label,
  field,
}: {
  label: JSX.Element;
  field: JSX.Element;
}): JSX.Element {
  return (
    <div className={c(styles.wrapper)}>
      <div className={c(styles.label_container)}>{label}</div>
      <div className={c(styles.field_container)}>{field}</div>
    </div>
  );
}

export default LeftLabeledField;
