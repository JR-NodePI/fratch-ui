import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { type ColorSchemeSwitcherProps } from '../ColorScheme';
import ColorSchemeSwitcher from '../ColorSchemeSwitcher';
import useColorScheme from '../useColorScheme';

vi.mock('../useColorScheme');

describe('ColorSchemeSwitcher', () => {
  const setColorSchema = vi.fn();

  beforeEach(() => {
    (
      useColorScheme as jest.MockedFunction<typeof useColorScheme>
    ).mockReturnValue(['light', setColorSchema]);
  });

  const setup = (props: ColorSchemeSwitcherProps = {}) =>
    render(<ColorSchemeSwitcher {...props} />);

  afterEach(() => {
    vi.resetAllMocks();
    setColorSchema.mockClear();
  });

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({
      className: 'mock_test_class_name',
    });
    expect(container).toMatchSnapshot();
  });

  it('should set a new color schema', async () => {
    setup();

    await userEvent.click(screen.getByRole('button'));

    expect(setColorSchema).toHaveBeenCalledTimes(1);
    expect(setColorSchema).toHaveBeenCalledWith('dark');
  });
});
