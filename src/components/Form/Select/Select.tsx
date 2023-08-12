import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { isEqual } from 'lodash';

import { c } from '../../../helpers/classNameHelpers';
import { isAscendantEvenTargetByID } from '../../../helpers/htmlSelectorsHelpers';
import { IconArrowDown } from '../../Icons/Icons';
import InputText from '../InputText/InputText';
import SelectOptionsList from './SelectOptionsList';
import { type SelectOption, type SelectProps } from './SelectProps';

import styles from './Select.module.css';

const selectInstances = new Map();

function filterOptionByText<T>(text: string) {
  return (option: SelectOption<T>): SelectOption<T> => {
    const nLabel = option.label.toLowerCase();
    const nText = text.toLowerCase();
    const visible = nLabel.includes(nText);

    let labelElement;
    if (visible) {
      const indexStart = nLabel.indexOf(nText);
      const indexEnd = indexStart + nText.length;

      const textStart = option.label.slice(0, indexStart);
      const text = option.label.slice(indexStart, indexEnd);
      const textEnd = option.label.slice(indexEnd);

      labelElement = (
        <>
          <span>{textStart}</span>
          <b>{text}</b>
          <span>{textEnd}</span>
        </>
      );
    }

    return Object.assign({}, option, { visible, labelElement });
  };
}

const useHideOnClickedOutside = ({
  uid,
  setVisible,
}: {
  uid: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}): void => {
  // hide options list when clicked outside
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent): void => {
      if (!isAscendantEvenTargetByID(event, uid)) {
        setVisible(false);
      }
    };
    window.document.body.addEventListener('click', handleDocumentClick);
    return () => {
      window.document.body.removeEventListener('click', handleDocumentClick);
    };
  }, [uid, setVisible]);
};

const useHideOnTriggerDOMRectChange = ({
  setVisible,
  visible,
  triggerDOMRect,
  triggerRef,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  triggerDOMRect?: DOMRect;
  triggerRef: React.RefObject<HTMLInputElement>;
  visible: boolean;
}): void => {
  useEffect(() => {
    if (visible && triggerDOMRect && triggerRef.current) {
      const intervalId = setInterval(() => {
        const newTriggerDOMRect =
          triggerRef.current && triggerRef.current.getBoundingClientRect();

        if (
          visible &&
          triggerDOMRect &&
          newTriggerDOMRect &&
          (newTriggerDOMRect.top !== triggerDOMRect.top ||
            newTriggerDOMRect.left !== triggerDOMRect.left ||
            newTriggerDOMRect.width !== triggerDOMRect.width ||
            newTriggerDOMRect.height !== triggerDOMRect.height ||
            newTriggerDOMRect.bottom !== triggerDOMRect.bottom)
        ) {
          setVisible(false);
        }
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [setVisible, triggerDOMRect, triggerRef, visible]);
};

function useKeyboardNavigation<T>({
  filteredOptions,
  handleOnChange,
  handleOnInputClick,
  selectedIndex,
  setVisible,
  visible,
}: {
  visible: boolean;
  selectedIndex?: number;
  filteredOptions: SelectOption<T>[];
  handleOnChange: (index: number) => void;
  handleOnInputClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>();

  useEffect(() => {
    if (!visible) {
      setFocusedItemIndex(undefined);
    }
  }, [visible]);

  useEffect(() => {
    setFocusedItemIndex(undefined);
  }, [filteredOptions]);

  const handleOnInputKeyDownCapture = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      event.code === 'ArrowDown' ||
      event.code === 'ArrowUp' ||
      event.code === 'Enter' ||
      event.code === 'Escape'
    ) {
      event.preventDefault();
    }

    if (visible) {
      const focusedIndex = focusedItemIndex ?? selectedIndex ?? -1;

      const nextIndex = filteredOptions.findIndex(
        ({ visible }, index) => visible !== false && index > focusedIndex
      );
      if (event.code === 'ArrowDown' && nextIndex >= 0) {
        setFocusedItemIndex(nextIndex);
      }

      const prevIndex = filteredOptions.reduce(
        (lastIndex, { visible }, index) => {
          if (visible !== false && index < focusedIndex && lastIndex < index) {
            return index;
          }
          return lastIndex;
        },
        -1
      );
      if (event.code === 'ArrowUp' && prevIndex >= 0) {
        setFocusedItemIndex(prevIndex);
      }

      if (event.code === 'Enter' && focusedItemIndex != null) {
        handleOnChange(focusedItemIndex);
      }

      if (event.code === 'Escape') {
        setVisible(false);
      }
    } else {
      handleOnInputClick(event as any);
    }
  };

  return { handleOnInputKeyDownCapture, focusedItemIndex, setFocusedItemIndex };
}

function Select<T>({
  className = '',
  cleanable = false,
  disabled = false,
  id,
  noResultsElement,
  onChange,
  onClean,
  options,
  placeholder = '',
  searchable = false,
  triggerElementRef,
  value,
}: SelectProps<T>): JSX.Element {
  const [uid] = useState<string>(crypto.randomUUID());
  const newTriggerRef = useRef<HTMLInputElement>(null);
  const triggerRef = triggerElementRef ?? newTriggerRef;
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [visible, setVisible] = useState<boolean>(false);
  const [triggerDOMRect, setTriggerDOMRect] = useState<DOMRect>();
  const [filteredOptions, setFilteredOptions] =
    useState<SelectOption<T>[]>(options);

  useEffect(() => {
    selectInstances.set(uid, {
      setVisible,
    });
    return () => {
      selectInstances.delete(uid);
    };
  }, [uid]);

  // set filtered options when options changes
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // set selected label and index when value changes
  useEffect(() => {
    const index = options.findIndex(option => isEqual(option.value, value));
    if (index >= 0) {
      const { label } = options[index];
      setSelectedLabel(label);
      setSelectedIndex(index);
    }
  }, [value, options]);

  const handleOnChange = (index: number): void => {
    const { value, label } = options[index];
    setSelectedLabel(label);
    setSelectedIndex(index);
    setVisible(false);
    onChange && onChange(value);

    setTimeout(() => {
      setFilteredOptions(options);
    }, 1000);
  };

  const handleOnClean = (): void => {
    onClean?.();
    if (selectedLabel) {
      setSelectedLabel('');
      setSelectedIndex(undefined);
      onChange && onChange(undefined);
      setFilteredOptions(options);
    }
  };

  const handleOnInputChange = (
    event?: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const text = event?.target?.value ?? '';
    setSelectedLabel(text);
    setSelectedIndex(undefined);

    if (text.trim() === '') {
      setFilteredOptions(options);
    } else {
      const data = options.map(filterOptionByText<T>(text));
      setFilteredOptions(data);
      setVisible(true);
    }
  };

  const handleOnInputBlur = (): void => {
    if (selectedIndex != null && selectedIndex >= 0) {
      const { label } = options[selectedIndex];
      setSelectedLabel(label);
    }
  };

  const handleOnInputClick = (): void => {
    if (!disabled && triggerRef.current) {
      // hide other select instances
      selectInstances.forEach((instance, key) => {
        if (key !== uid) {
          instance.setVisible(false);
        }
      });

      setVisible(true);
      setTriggerDOMRect(triggerRef.current.getBoundingClientRect());
    }
  };

  const { focusedItemIndex, setFocusedItemIndex, handleOnInputKeyDownCapture } =
    useKeyboardNavigation({
      filteredOptions,
      handleOnChange,
      handleOnInputClick,
      selectedIndex,
      setVisible,
      visible,
    });

  // hide options list when disabled
  useEffect(() => {
    if (disabled) {
      setVisible(false);
    }
  }, [disabled]);

  useHideOnClickedOutside({ uid, setVisible });

  useHideOnTriggerDOMRectChange({
    setVisible,
    triggerDOMRect,
    triggerRef,
    visible,
  });

  return (
    <div
      id={uid}
      className={c(className, styles.select, disabled ? styles.disabled : '')}
    >
      <div className={c(styles.controls)}>
        <div>
          <InputText
            id={id}
            title={selectedLabel}
            ref={triggerRef}
            className={c(styles.trigger)}
            cleanerClassName={c(styles.cleaner)}
            disabled={disabled}
            onChange={handleOnInputChange}
            onClean={handleOnClean}
            onBlur={handleOnInputBlur}
            onKeyDownCapture={handleOnInputKeyDownCapture}
            onClick={handleOnInputClick}
            placeholder={placeholder}
            readOnly={!searchable}
            value={selectedLabel}
            cleanable={cleanable}
          />
          <IconArrowDown className={c(styles.trigger_icon)} />
        </div>
      </div>

      {createPortal(
        <SelectOptionsList
          noResultsElement={noResultsElement}
          onChange={handleOnChange}
          options={filteredOptions}
          selectedIndex={selectedIndex}
          focusedIndex={focusedItemIndex}
          setFocusedItemIndex={setFocusedItemIndex}
          triggerDOMRect={triggerDOMRect}
          visible={visible}
        />,
        document.body,
        uid
      )}
    </div>
  );
}

export default Select;
