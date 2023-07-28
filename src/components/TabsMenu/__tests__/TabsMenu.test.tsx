import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import IconCheck from '../../Icon/IconCheck';
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

  it('should render with editable', () => {
    const { container } = setup({
      editable: true,
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

  it('should add new tab based on template in editable mode', async () => {
    const { container } = setup({
      editable: true,
      tabs: [],
      newTabTemplate: { label: 'new-tab-label-from-template' },
    });

    await userEvent.click(screen.getByRole('link', { name: /Add new tab/ }));

    expect(container).toMatchSnapshot();
  });

  it('should perform onTabAdd', async () => {
    const onTabAdd = vi.fn();
    setup({
      editable: true,
      onTabAdd,
      newTabTemplate: { label: 'new-tab-label' },
    });

    await userEvent.click(screen.getByRole('link', { name: /Add new tab/ }));

    expect(onTabAdd).toHaveBeenCalledTimes(1);
    expect(onTabAdd).toHaveBeenCalledWith({
      index: 0,
      label: 'new-tab-label',
    });
  });

  it('should perform onTabsChange', async () => {
    const onTabsChange = vi.fn();
    setup({
      editable: true,
      onTabsChange,
    });

    expect(onTabsChange).toHaveBeenCalledTimes(1);
    expect(onTabsChange).toHaveBeenCalledWith([]);

    await userEvent.click(screen.getByRole('link', { name: /Add new tab/ }));

    expect(onTabsChange).toHaveBeenCalledTimes(2);
    expect(onTabsChange).toHaveBeenCalledWith([{ active: true }]);
  });

  it('should perform onTabRemove', async () => {
    const onTabRemove = vi.fn();
    const onTabsChange = vi.fn();
    setup({
      editable: true,
      tabs: [
        { label: 'label-test-1' },
        { label: 'label-test-2' },
        { label: 'label-test-3' },
      ],
      onTabRemove,
      onTabsChange,
    });

    expect(onTabsChange).toHaveBeenCalledTimes(1);
    expect(onTabsChange).toHaveBeenCalledWith([
      { label: 'label-test-1' },
      { label: 'label-test-2' },
      { label: 'label-test-3' },
    ]);

    await userEvent.click(
      (
        await screen.getAllByRole('button', {
          name: /Remove tag/,
          hidden: true,
        })
      )?.[1]
    );

    expect(onTabsChange).toHaveBeenCalledTimes(2);
    expect(onTabsChange).toHaveBeenCalledWith([
      { label: 'label-test-1' },
      { label: 'label-test-3' },
    ]);

    expect(onTabRemove).toHaveBeenCalledTimes(1);
    expect(onTabRemove).toHaveBeenCalledWith({
      index: 1,
    });
  });

  it('should perform onTabClick', async () => {
    const onTabClick = vi.fn();
    setup({
      editable: true,
      tabs: [
        { label: 'label-test-1' },
        { label: 'label-test-2' },
        { label: 'label-test-3' },
      ],
      onTabClick,
    });

    await userEvent.click(await screen.getByText('label-test-2'));

    expect(onTabClick).toHaveBeenCalledTimes(1);
    expect(onTabClick).toHaveBeenCalledWith({
      index: 1,
      label: 'label-test-2',
    });
  });

  it('should perform onTabClick', async () => {
    const onTabClick = vi.fn();
    setup({
      editable: true,
      tabs: [
        { label: 'label-test-1' },
        { label: 'label-test-2' },
        { label: 'label-test-3' },
      ],
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
    setup({
      editable: true,
      tabs: [
        { label: 'label-test-1' },
        { label: 'label-test-2' },
        { label: 'label-test-3' },
      ],
      onTabEdit,
    });

    await userEvent.click(
      (
        await screen.getAllByRole('button', {
          name: /Edit tag/,
          hidden: true,
        })
      )?.[1]
    );

    await userEvent.type(
      screen.getByRole('textbox', { name: /Edit tag/i }),
      '-and-new-value'
    );
    await userEvent.keyboard('{enter}');

    expect(onTabEdit).toHaveBeenCalledTimes(1);
    expect(onTabEdit).toHaveBeenCalledWith({
      index: 1,
      label: 'label-test-2-and-new-value',
    });
  });
});
