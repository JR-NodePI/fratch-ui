import { renderHook } from '@testing-library/react-hooks';
import { describe, it, vi } from 'vitest';

import useColorSchemeMediaQuery from '../useColorSchemeMediaQuery';
import usePersistedColorScheme from '../usePersistedColorScheme';

vi.mock('../usePersistedColorScheme');

describe('useColorSchemeMediaQuery', () => {
  const setColorScheme = vi.fn();
  const defaultColorScheme = 'light';

  const matchMediaAddEventListener = vi.fn();
  const matchMediaRemoveEventListener = vi.fn();

  beforeEach(() => {
    (
      usePersistedColorScheme as jest.MockedFunction<
        typeof usePersistedColorScheme
      >
    ).mockReturnValue([defaultColorScheme, setColorScheme]);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: any) => ({
        matches: false,
        media: query,
        addEventListener: matchMediaAddEventListener,
        removeEventListener: matchMediaRemoveEventListener,
      })),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    setColorScheme.mockClear();
    matchMediaAddEventListener.mockClear();
    matchMediaRemoveEventListener.mockClear();
  });

  it('should return the persistedColorScheme and colorScheme setter', async () => {
    const { result, unmount } = renderHook(() => useColorSchemeMediaQuery());
    expect(result.current).toEqual([defaultColorScheme, setColorScheme]);

    expect(usePersistedColorScheme).toHaveBeenCalledTimes(1);
    expect(usePersistedColorScheme).toHaveBeenCalledWith('light');

    await unmount();
  });

  it('should return the colorScheme dark when prefers-color-scheme matches', async () => {
    const { unmount } = renderHook(() => useColorSchemeMediaQuery());

    expect(window.matchMedia).toHaveBeenCalledTimes(2);
    expect(window.matchMedia).toHaveBeenCalledWith(
      '(prefers-color-scheme: dark)'
    );

    expect(usePersistedColorScheme).toHaveBeenCalledTimes(1);
    expect(usePersistedColorScheme).toHaveBeenCalledWith(defaultColorScheme);

    expect(matchMediaAddEventListener).toHaveBeenCalledTimes(1);
    expect(matchMediaAddEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
    const matchMediaHandler = matchMediaAddEventListener.mock.calls[0][1];
    matchMediaHandler({ matches: true });

    expect(setColorScheme).toHaveBeenCalledTimes(1);
    expect(setColorScheme).toHaveBeenCalledWith('dark');

    await unmount();

    expect(matchMediaRemoveEventListener).toHaveBeenCalledTimes(1);
    expect(matchMediaRemoveEventListener).toHaveBeenCalledWith(
      'change',
      matchMediaHandler
    );
  });
});
