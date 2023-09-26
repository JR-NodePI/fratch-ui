import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SettingsMenu from './SettingsMenu';
import { SettingsMenuProps } from './SettingsMenuProps';

describe('SettingsMenu', () => {
  const settingsMenuId = 'crypto-mock-random-UUID-1234';
  const setup = (
    props: SettingsMenuProps = {}
  ): ReturnType<typeof render> & { settingsMenu: Element | null } => {
    const { container, ...data } = render(<SettingsMenu {...props} />);
    return {
      container,
      ...data,
      settingsMenu: container.querySelector(`#${settingsMenuId}`),
    };
  };

  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(settingsMenuId);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with items', () => {
    const items = [
      <span>item 1</span>,
      <span>item 2</span>,
      <span>item 3</span>,
    ];
    const { container } = setup({ items });
    expect(container).toMatchSnapshot();
  });

  it('should open and then close', async () => {
    const { settingsMenu } = setup();

    await userEvent.click(screen.getByRole('button'));

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "_settings_menu_241598",
        "1": "_open_241598",
        "2": "_left_241598",
      }
    `);

    await userEvent.click(window.document.body);

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "_settings_menu_241598",
        "1": "_close_241598",
        "2": "_left_241598",
      }
    `);
  });

  it('should render with className', () => {
    const { settingsMenu } = setup({ className: 'mock_test_class_name' });

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "mock_test_class_name",
        "1": "_settings_menu_241598",
        "2": "_close_241598",
        "3": "_left_241598",
      }
    `);
  });

  it('should render with right position', () => {
    const { settingsMenu } = setup({ position: 'right' });

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "_settings_menu_241598",
        "1": "_close_241598",
        "2": "_right_241598",
      }
    `);
  });
});
