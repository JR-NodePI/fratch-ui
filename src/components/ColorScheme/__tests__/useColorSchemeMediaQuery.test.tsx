import { renderHook } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import useColorSchemeMediaQuery from '../useColorSchemeMediaQuery';
import usePersistedColorScheme from '../usePersistedColorScheme';

vi.mock('../usePersistedColorScheme');

describe('useColorSchemeMediaQuery', () => {
  const setColorScheme = vi.fn();
  const defaultColorScheme = 'light';

  const usePersistedColorSchemeMock =
    usePersistedColorScheme as jest.MockedFunction<
      typeof usePersistedColorScheme
    >;
  const matchMediaAddEventListener = vi.fn();
  const matchMediaRemoveEventListener = vi.fn();
  const getMatchMediaMock = ({ matches }: { matches: boolean }) =>
    vi.fn().mockImplementation((query: any) => ({
      matches,
      media: query,
      addEventListener: matchMediaAddEventListener,
      removeEventListener: matchMediaRemoveEventListener,
    }));

  beforeEach(() => {
    usePersistedColorSchemeMock.mockReturnValue([
      defaultColorScheme,
      setColorScheme,
    ]);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: getMatchMediaMock({ matches: false }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    setColorScheme.mockClear();
    matchMediaAddEventListener.mockClear();
    matchMediaRemoveEventListener.mockClear();
  });

  it('should return the colorScheme as light and colorScheme setter', async () => {
    const { result, unmount } = renderHook(() => useColorSchemeMediaQuery());
    expect(result.current).toEqual([defaultColorScheme, setColorScheme]);

    expect(usePersistedColorScheme).toHaveBeenCalledTimes(1);
    expect(usePersistedColorScheme).toHaveBeenCalledWith('light');

    await unmount();
  });

  it('should return the colorScheme as dark when the prefers-color-scheme matches', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: getMatchMediaMock({ matches: true }),
    });
    usePersistedColorSchemeMock.mockReturnValue(['dark', setColorScheme]);

    const { result, unmount } = renderHook(() => useColorSchemeMediaQuery());

    expect(result.current).toEqual(['dark', setColorScheme]);

    expect(usePersistedColorScheme).toHaveBeenCalledTimes(1);
    expect(usePersistedColorScheme).toHaveBeenCalledWith('dark');

    await unmount();

    expect(window.matchMedia).toHaveBeenCalledTimes(3);
    expect(window.matchMedia).toHaveBeenCalledWith(
      '(prefers-color-scheme: dark)'
    );
  });

  it('should return the colorScheme dark when prefers-color-scheme event matches', async () => {
    const { unmount } = renderHook(() => useColorSchemeMediaQuery());

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

    expect(window.matchMedia).toHaveBeenCalledTimes(3);
    expect(window.matchMedia).toHaveBeenCalledWith(
      '(prefers-color-scheme: dark)'
    );
    expect(matchMediaRemoveEventListener).toHaveBeenCalledTimes(1);
    expect(matchMediaRemoveEventListener).toHaveBeenCalledWith(
      'change',
      matchMediaHandler
    );
  });
});
