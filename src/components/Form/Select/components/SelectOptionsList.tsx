import { c } from '../../../../helpers/classNameHelpers';
import { useEffect, useRef, useState } from 'react';
import { type SelectOptionsListProps } from './SelectOptionsListProps';

import styles from './SelectOptionsList.module.css';

const MAX_VISIBLE_ITEMS = 8;
const LIST_VERTICAL_MARGIN = 2;

const getVisibilityStyles = ({
  visible,
  triggerDOMRect,
  itemHeight,
}: {
  visible?: boolean;
  triggerDOMRect?: DOMRect;
  itemHeight?: number;
}): any => {
  if (visible && triggerDOMRect && itemHeight) {
    const { top, height, width, left } = triggerDOMRect;
    const elementTop = top + height + LIST_VERTICAL_MARGIN;

    const maxMaxHeight = itemHeight * MAX_VISIBLE_ITEMS;

    let maxHeight = window.innerHeight - elementTop - LIST_VERTICAL_MARGIN * 2;
    if (maxHeight > maxMaxHeight) {
      maxHeight = maxMaxHeight;
    }

    return {
      left,
      width,
      top: elementTop,
      maxHeight,
    };
  }

  return {
    left: 0,
    width: 0,
    top: 0,
    maxHeight: 0,
  };
};

function SelectOptionsList<T>({
  noResultsElement,
  onChange,
  options = [],
  selectedIndex,
  triggerDOMRect,
  visible,
}: SelectOptionsListProps<T>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastScroll, setLastScroll] = useState<number>(0);

  useEffect(() => {
    if (visible && containerRef.current) {
      containerRef.current.scrollTop = lastScroll;
    }
  }, [visible, lastScroll]);

  useEffect(() => {
    if (!selectedIndex) {
      setLastScroll(0);
    }
  }, [selectedIndex]);

  const handleItemClick = (event: any): void => {
    event.preventDefault();
    const element = event.target;
    const index = Number(element.dataset.index);
    if (!isNaN(index)) {
      onChange && onChange(index);
      setLastScroll(containerRef?.current?.scrollTop ?? 0);
    }
  };

  const [itemHeight, setItemHeight] = useState<number>();
  const handleItemRef = (current: HTMLLIElement): void => {
    if (current && !itemHeight) {
      setItemHeight(current.offsetHeight);
    }
  };

  const visibilityStyles = getVisibilityStyles({
    visible,
    triggerDOMRect,
    itemHeight,
  });

  const classNames = [
    styles.select_list,
    visible ? styles.visible : styles.hidden,
  ];

  const hasSomeVisibleOption = options.some(({ visible }) => visible !== false);

  return (
    <div ref={containerRef} className={c(classNames)} style={visibilityStyles}>
      <ul>
        {hasSomeVisibleOption ? (
          options.map(
            (option, index) =>
              option.visible !== false && (
                <li
                  ref={handleItemRef}
                  key={index}
                  className={c(selectedIndex === index ? styles.selected : '')}
                >
                  <a
                    href="#"
                    title={option.label}
                    data-index={index}
                    onClick={handleItemClick}
                  >
                    {option.labelElement ?? option.label}
                  </a>
                </li>
              )
          )
        ) : (
          <li>{noResultsElement || <span>...</span>}</li>
        )}
      </ul>
    </div>
  );
}
export default SelectOptionsList;
