import { useEffect, useState } from 'react';

import { c } from '../../helpers/classNameHelpers';
import ButtonCloser from '../ButtonCloser/ButtonCloser';
import TabLabelEditable from './components/TabLabelEditable';
import { type Tab, type TabsMenuProps } from './TabsMenuProps';

import styles from './TabMenu.module.css';

export default function TabsMenu({
  className,
  editable,
  newTabTemplate,
  onTabAdd,
  onTabClick,
  onTabEdit,
  onTabRemove,
  onTabsChange,
  tabs,
}: TabsMenuProps): JSX.Element {
  const [currentTabs, setCurrentTabs] = useState<Tab[]>(tabs ?? []);

  useEffect(() => {
    onTabsChange?.(currentTabs);
  }, [onTabsChange, currentTabs]);

  const handleTabClick = (currentTabindex: number): void => {
    setCurrentTabs(
      currentTabs.map((tab, index) => ({
        ...tab,
        active: index === currentTabindex,
      }))
    );

    const currentTab = !isNaN(currentTabindex)
      ? currentTabs[currentTabindex]
      : null;
    onTabClick?.({ label: currentTab?.label, index: currentTabindex });
  };

  const handleAddClick = (): void => {
    let newTabs = currentTabs;

    newTabs = currentTabs.map(tab => ({
      ...tab,
      active: false,
    }));

    newTabs = [...(newTabs ?? []), { ...(newTabTemplate ?? {}), active: true }];

    setCurrentTabs(newTabs);

    const newTabIndex = currentTabs.length ?? 0;
    onTabAdd?.({ label: newTabTemplate?.label, index: newTabIndex });
  };

  const handleRemoveClick = (currentTabindex: number): void => {
    const currentTab = !isNaN(currentTabindex)
      ? currentTabs[currentTabindex]
      : null;
    let newTabs = currentTabs;

    const mustActivatePreviousTab = currentTab?.active && currentTabindex > 0;

    if (mustActivatePreviousTab) {
      newTabs = newTabs?.map((tab, index) => ({
        ...tab,
        active: index === currentTabindex - 1,
      }));
    }

    const mustActivateNextTab =
      currentTab?.active && currentTabindex < (newTabs?.length ?? 0) - 1;

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
            <a
              href="#"
              className={c(styles.tab_trigger)}
              onClick={event => {
                event.preventDefault();
                handleTabClick(index);
              }}
            >
              {Icon && <Icon className={c(styles.tab_icon)} />}
              <TabLabelEditable
                className={c(styles.tab_label)}
                label={label}
                editable={editable}
                onChange={(newLabel: string) => {
                  handleEditChange(index, newLabel);
                }}
              />
            </a>
            {editable && (
              <ButtonCloser
                title="Remove tag"
                className={c(styles.tab_closer)}
                onClick={() => handleRemoveClick(index)}
              />
            )}
          </li>
        ))}
        {editable && (
          <li className={c(styles.add_tab)}>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                handleAddClick();
              }}
              title="Add new tab"
            >
              +
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
