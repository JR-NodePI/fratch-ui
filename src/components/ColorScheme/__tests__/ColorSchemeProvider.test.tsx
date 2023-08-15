import { useContext } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ColorSchemeContext from '../ColorSchemeContext';
import ColorSchemeProvider from '../ColorSchemeProvider';
import useColorSchemeMediaQuery from '../useColorSchemeMediaQuery';

vi.mock('../useColorSchemeMediaQuery');

describe('ColorSchemeSwitcher', () => {
  const setColorScheme = vi.fn();

  beforeEach(() => {
    (
      useColorSchemeMediaQuery as jest.MockedFunction<
        typeof useColorSchemeMediaQuery
      >
    ).mockReturnValue(['light', setColorScheme]);
  });

  const setup = () => {
    const MockChildComponent = () => {
      const [colorScheme, setColorScheme] = useContext(ColorSchemeContext);
      const handleClick = () => {
        setColorScheme('dark');
      };
      return (
        <>
          {JSON.stringify({ colorScheme })}
          <button onClick={handleClick}>CHANGE</button>
        </>
      );
    };

    return render(
      <ColorSchemeProvider>
        <MockChildComponent />
      </ColorSchemeProvider>
    );
  };

  afterEach(() => {
    vi.resetAllMocks();
    setColorScheme.mockClear();
  });

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();

    expect(useColorSchemeMediaQuery).toHaveBeenCalledTimes(1);
  });

  it('should set a new color schema', async () => {
    setup();

    await userEvent.click(screen.getByRole('button'));

    expect(setColorScheme).toHaveBeenCalledTimes(1);
    expect(setColorScheme).toHaveBeenCalledWith('dark');
  });
});
