import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, Mock, vi } from 'vitest';

import { hasClosestElement } from '../../helpers/htmlSelectorsHelpers';
import SettingsModal from './SettingsModal';
import { SETTINGS_MODAL_TIMEOUT_TO_CLOSE } from './SettingsModalConstants';
import { SettingsModalProps } from './SettingsModalProps';

vi.mock('../../helpers/htmlSelectorsHelpers');

const timeout = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, time));

describe('SettingsModal', () => {
  const settingsMenuId = 'crypto-mock-random-UUID-1234';
  const setup = (
    props: SettingsModalProps = {}
  ): ReturnType<typeof render> & { settingsMenu: Element | null } => {
    const { container, ...data } = render(<SettingsModal {...props} />);
    return {
      container,
      ...data,
      settingsMenu: container.querySelector(`#${settingsMenuId}`),
    };
  };

  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(settingsMenuId);
    (hasClosestElement as Mock).mockReturnValue(true);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render as visible', () => {
    const { container } = setup({ visible: true });
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
    (hasClosestElement as Mock).mockReturnValue(false);
    const { settingsMenu } = setup();

    await userEvent.click(screen.getByRole('button'));

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "_settings_menu_21fdeb",
        "1": "_open_21fdeb",
        "2": "_left_21fdeb",
      }
    `);

    await userEvent.tab();
    await timeout(SETTINGS_MODAL_TIMEOUT_TO_CLOSE);

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "_settings_menu_21fdeb",
        "1": "_close_21fdeb",
        "2": "_left_21fdeb",
      }
    `);
  });

  it('should render with className', () => {
    const { settingsMenu } = setup({ className: 'mock_test_class_name' });

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "mock_test_class_name",
        "1": "_settings_menu_21fdeb",
        "2": "_close_21fdeb",
        "3": "_left_21fdeb",
      }
    `);
  });

  it('should render with right position', () => {
    const { settingsMenu } = setup({ position: 'right' });

    expect(settingsMenu?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "_settings_menu_21fdeb",
        "1": "_close_21fdeb",
        "2": "_right_21fdeb",
      }
    `);
  });
});
