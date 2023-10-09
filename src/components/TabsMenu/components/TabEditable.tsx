import { type FocusEvent, type KeyboardEvent, useState } from 'react';

import { c } from '../../../helpers';
import { IconEdit } from '../../Icons';
import { TabEditableProps } from './TabEditableProps';

import styles from './TabEditable.module.css';

export default function TabEditable({
  className,
  editable,
  label,
  onChange,
}: TabEditableProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [width, setWidth] = useState<number | undefined>();

  const handleEditClick = (): void => {
    setIsEditing(true);
  };

  const handleChange = (value: string): void => {
    if (value !== label) {
      setWidth(undefined);
      onChange?.(value);
    }
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>): void => {
    handleChange(event.currentTarget.value);
    setIsEditing(false);
  };

  const [lastValue, setLastValue] = useState<string>('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    if (lastValue.length < value.length) {
      setWidth(event.currentTarget.scrollWidth);
    }
    setLastValue(value);

    if (event.key === 'Enter') {
      handleChange(value);
      setIsEditing(false);
    }
  };

  return (
    <div className={c(styles.tab_editable, className)} style={{ width }}>
      <div className={c(styles.label)}>
        <span className={c(styles.text)}>{label || '...'}</span>
        {editable && (
          <button
            className={c(styles.edit_button)}
            onClick={handleEditClick}
            title="Edit tag"
          >
            <IconEdit className={c(styles.edit_icon)} />
            <i>Edit tag</i>
          </button>
        )}
      </div>
      {isEditing && (
        <input
          aria-label="Edit tag"
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
