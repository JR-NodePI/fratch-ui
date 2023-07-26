import { type FocusEvent, type KeyboardEvent, useState } from 'react';

import { c } from '../../../helpers/classNameHelpers';

import styles from './TabLabelEditable.module.css';

export default function TabLabelEditable({
  className,
  editable,
  label,
  onChange,
}: {
  className?: string;
  editable?: boolean;
  label?: string;
  onChange?: (value: string) => void;
}): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = (): void => {
    setIsEditing(true);
  };

  const handleChange = (value: string): void => {
    if (value !== label) {
      onChange?.(value);
    }
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>): void => {
    handleChange(event.currentTarget.value);
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleChange(event.currentTarget.value);
      setIsEditing(false);
    }
  };

  return (
    <div className={c(styles.label_editable, className)}>
      <div className={c(styles.label)}>
        <span className={c(styles.text)}>{label || '...'}</span>
        {editable && (
          <button
            className={c(styles.edit_button)}
            onClick={handleEditClick}
            title="Edit tag"
          >
            ✎
          </button>
        )}
      </div>
      {isEditing && (
        <input
          autoFocus
          className={c(styles.input)}
          defaultValue={label}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
          type="text"
        />
      )}
    </div>
  );
}
