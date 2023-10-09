import { c } from '../../../helpers';
import { LeftLabeledFieldProps } from './LeftLabeledFieldProps';

import styles from './LeftLabeledField.module.css';

function LeftLabeledField({
  className,
  field,
  label,
}: LeftLabeledFieldProps): JSX.Element {
  return (
    <div className={c(styles.wrapper, className)}>
      <div className={c(styles.label_container)}>{label}</div>
      <div className={c(styles.field_container)}>{field}</div>
    </div>
  );
}

export default LeftLabeledField;
