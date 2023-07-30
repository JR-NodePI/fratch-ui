import { useEffect, useState } from 'react';

import { isEqual } from 'lodash';

import { c } from '../../helpers/classNameHelpers';
import ButtonCloser from '../ButtonCloser/ButtonCloser';
import { IconPlus } from '../Icons/Icons';
import TabEditable from './components/TabEditable';
import { type Tab, type TabsMenuProps } from './TabsMenuProps';

import styles from './TabMenu.module.css';

export default function TabsMenu({
  className,
  editable,
  removable,
  addable,
  newTabTemplate,
  onTabAdd,
  onTabClick,
  onTabEdit,
  onTabRemove,
  onTabsChange,
  tabs,
}: TabsMenuProps): JSX.Element {
  const [initialTabs, setInitialTabs] = useState<Tab[]>(tabs ?? []);
  const [currentTabs, setCurrentTabs] = useState<Tab[]>(tabs ?? []);

  useEffect(() => {
    if (!isEqual(initialTabs, currentTabs)) {
      onTabsChange?.(currentTabs);
      setInitialTabs(currentTabs);
    }
  }, [onTabsChange, currentTabs, initialTabs]);

  const handleTabClick = (currentTabindex: number): void => {
    setCurrentTabs(
      currentTabs.map((tab, index) => ({
        ...tab,
        active: index === currentTabindex,
      }))
    );
    const currentTab = currentTabs?.[currentTabindex];
    onTabClick?.({ label: currentTab?.label, index: currentTabindex });
  };

  const handleAddClick = (): void => {
    let newTabs = currentTabs;

    newTabs = currentTabs.map(tab => ({
      ...tab,
      active: false,
    }));

    newTabs = [...newTabs, { ...(newTabTemplate ?? {}), active: true }];

    setCurrentTabs(newTabs);

    const newTabIndex = currentTabs.length;
    onTabAdd?.({ label: newTabTemplate?.label, index: newTabIndex });
  };

  const handleRemoveClick = (currentTabindex: number): void => {
    let newTabs = currentTabs;
    const currentTab = currentTabs[currentTabindex];
    const mustActivatePreviousTab = currentTab?.active && currentTabindex > 0;

    if (mustActivatePreviousTab) {
      newTabs = newTabs?.map((tab, index) => ({
        ...tab,
        active: index === currentTabindex - 1,
      }));
    }

    const mustActivateNextTab =
      currentTab?.active && currentTabindex < newTabs?.length - 1;

    if (mustActivateNextTab) {
      newTabs = newTabs?.map((tab, index) => ({
        ...tab,
        active: index === currentTabindex + 1,
      }));
    }

    newTabs = newTabs?.filter((_tab, index) => index !== currentTabindex);

    setCurrentTabs(newTabs);

    onTabRemove?.({
      index: currentTabindex,
    });
  };

  const handleEditChange = (
    currentTabindex: number,
    newLabel: string
  ): void => {
    setCurrentTabs(
      currentTabs.map((tab, index) => {
        if (index === currentTabindex) {
          return {
            ...tab,
            label: newLabel,
          };
        }
        return tab;
      })
    );

    onTabEdit?.({ label: newLabel, index: currentTabindex });
  };

  return (
    <nav className={c(styles.tab_menu, className)}>
      <ul>
        {currentTabs.map(({ label, Icon, active }, index) => (
          <li
            className={c(styles.tab_item, active ? styles.active : '')}
            key={index}
            title={label}
          >
            <div
              className={c(styles.tab_trigger)}
              onClick={() => {
                handleTabClick(index);
              }}
            >
              {Icon && <Icon className={c(styles.tab_icon)} />}
              <TabEditable
                className={c(styles.tab_label)}
                label={label}
                editable={editable}
                onChange={(newLabel: string) => {
                  handleEditChange(index, newLabel);
                }}
              />
            </div>
            {removable && (
              <ButtonCloser
                title="Remove tab"
                className={c(styles.tab_closer)}
                onClick={() => handleRemoveClick(index)}
              />
            )}
          </li>
        ))}
        {addable && (
          <li className={c(styles.add_tab)}>
            <a
              title="Add new tab"
              aria-label="Add new tab"
              href="#"
              onClick={event => {
                event.preventDefault();
                handleAddClick();
              }}
            >
              <IconPlus />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
