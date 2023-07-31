import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { IconCheck } from '../../Icons/Icons';
import TabsMenu from '../TabsMenu';
import { type TabsMenuProps } from '../TabsMenuProps';

describe('TabsMenu.tsx', () => {
  const getComponent = (props: TabsMenuProps = {}) => <TabsMenu {...props} />;
  const setup = (props = {}) => render(getComponent(props));

  it('should render properly', () => {
    const { container } = setup({
      tabs: [
        {
          active: true,
          label: 'label-test-1',
          Icon: IconCheck,
        },
        {
          label: 'label-test-2',
        },
        {
          label: 'label-test-3',
        },
      ],
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with editable addable and removable', () => {
    const { container } = setup({
      editable: true,
      addable: true,
      removable: true,
      tabs: [
        {
          label: 'label-test-1',
          active: true,
        },
        {
          label: 'label-test-2',
        },
      ],
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({
      className: 'className-test',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with tab colors', () => {
    const mockTabs = [
      { label: 'label-1', color: 'Red' },
      { label: 'label-2', color: 'Blue' },
    ];

    const { container } = setup({
      className: 'className-test',
      tabs: mockTabs,
    });
    expect(container).toMatchSnapshot();
  });

  it('should add new tab based on template in addable mode', async () => {
    const { container } = setup({
      addable: true,
      tabs: [],
      newTabTemplate: { label: 'new-tab-label-from-template' },
    });

    await userEvent.click(screen.getByRole('link', { name: /Add new tab/ }));

    expect(container).toMatchSnapshot();
  });

  it('should perform onTabAdd', async () => {
    const onTabAdd = vi.fn();
    const mockTabs = [{ label: 'label-test-1', active: true }];
    setup({
      addable: true,
      onTabAdd,
      newTabTemplate: { label: 'new-tab-label' },
      tabs: mockTabs,
    });

    await userEvent.click(screen.getByRole('link', { name: /Add new tab/ }));

    expect(onTabAdd).toHaveBeenCalledTimes(1);
    expect(onTabAdd).toHaveBeenCalledWith({
      index: 1,
      label: 'new-tab-label',
    });
  });

  it('should perform onTabsChange', async () => {
    const onTabsChange = vi.fn();
    setup({
      addable: true,
      editable: true,
      removable: true,
      onTabsChange,
    });

    await userEvent.click(screen.getByRole('link', { name: /Add new tab/ }));

    expect(onTabsChange).toHaveBeenCalledTimes(1);
    expect(onTabsChange).toHaveBeenCalledWith([{ active: true }]);
  });

  describe('should perform onTabRemove', async () => {
    it('with next tab active', async () => {
      const mockTabs = [
        { label: 'label-test-1' },
        { label: 'label-test-2', active: true },
        { label: 'label-test-3' },
      ];
      const expectedTabIndexRemoved = 1;

      const onTabRemove = vi.fn();
      const onTabsChange = vi.fn();
      setup({
        removable: true,
        tabs: mockTabs,
        onTabRemove,
        onTabsChange,
      });

      await userEvent.click(
        (
          await screen.getAllByRole('button', {
            name: /Remove tab/,
            hidden: true,
          })
        )?.[expectedTabIndexRemoved]
      );

      expect(onTabsChange).toHaveBeenCalledTimes(1);
      expect(onTabsChange).toHaveBeenCalledWith([
        { label: 'label-test-1', active: false },
        { label: 'label-test-3', active: true },
      ]);

      expect(onTabRemove).toHaveBeenCalledTimes(1);
      expect(onTabRemove).toHaveBeenCalledWith({
        Icon: undefined,
        color: undefined,
        index: expectedTabIndexRemoved,
        label: 'label-test-2',
      });
    });

    it('with previous tab active', async () => {
      const mockTabs = [
        { label: 'label-test-1' },
        { label: 'label-test-2' },
        { label: 'label-test-3', active: true },
      ];
      const expectedTabIndexRemoved = 2;

      const onTabRemove = vi.fn();
      const onTabsChange = vi.fn();
      setup({
        removable: true,
        tabs: mockTabs,
        onTabRemove,
        onTabsChange,
      });

      await userEvent.click(
        (
          await screen.getAllByRole('button', {
            name: /Remove tab/,
            hidden: true,
          })
        )?.[expectedTabIndexRemoved]
      );

      expect(onTabsChange).toHaveBeenCalledTimes(1);
      expect(onTabsChange).toHaveBeenCalledWith([
        { label: 'label-test-1', active: false },
        { label: 'label-test-2', active: true },
      ]);

      expect(onTabRemove).toHaveBeenCalledTimes(1);
      expect(onTabRemove).toHaveBeenCalledWith({
        Icon: undefined,
        color: undefined,
        index: expectedTabIndexRemoved,
        label: 'label-test-3',
      });
    });
  });

  it('should perform onTabClick', async () => {
    const onTabClick = vi.fn();
    const mockTabs = [
      { label: 'label-test-1', active: true },
      { label: 'label-test-2' },
      { label: 'label-test-3' },
    ];
    setup({
      tabs: mockTabs,
      onTabClick,
    });

    await userEvent.click(await screen.getByText('label-test-2'));

    expect(onTabClick).toHaveBeenCalledTimes(1);
    expect(onTabClick).toHaveBeenCalledWith({
      index: 1,
      label: 'label-test-2',
    });
  });

  it('should perform onTabEdit', async () => {
    const onTabEdit = vi.fn();
    const mockTabs = [
      { label: 'label-test-1' },
      { label: 'label-test-2', active: true },
      { label: 'label-test-3' },
    ];
    const expectedTabIndexEdited = 1;
    setup({
      editable: true,
      tabs: mockTabs,
      onTabEdit,
    });

    await userEvent.click(
      (
        await screen.getAllByRole('button', {
          name: /Edit tag/,
          hidden: true,
        })
      )?.[expectedTabIndexEdited]
    );

    await userEvent.type(
      screen.getByRole('textbox', { name: /Edit tag/i }),
      '-and-new-value'
    );
    await userEvent.keyboard('{enter}');

    expect(onTabEdit).toHaveBeenCalledTimes(1);
    expect(onTabEdit).toHaveBeenCalledWith({
      index: expectedTabIndexEdited,
      label: 'label-test-2-and-new-value',
    });
  });
});
