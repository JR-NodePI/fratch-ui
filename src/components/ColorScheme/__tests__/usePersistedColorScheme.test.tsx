import { act } from 'react-dom/test-utils';

import { renderHook } from '@testing-library/react';
import { describe, it } from 'vitest';

import usePersistedColorScheme from '../usePersistedColorScheme';

describe('usePersistedColorScheme', () => {
  const defaultColorScheme = 'light';

  afterEach(() => {
    globalThis.localStorage.clear();
  });

  it('should return the defaultColorScheme and colorScheme setter', () => {
    const { result } = renderHook(() =>
      usePersistedColorScheme(defaultColorScheme)
    );
    expect(result.current).toEqual([defaultColorScheme, expect.any(Function)]);
  });

  it('should return the colorScheme from localStorage', () => {
    const storedColorScheme = 'dark';
    globalThis.localStorage.setItem('fratch-color-scheme', storedColorScheme);

    const { result } = renderHook(() =>
      usePersistedColorScheme(defaultColorScheme)
    );

    expect(defaultColorScheme).not.toEqual(storedColorScheme);
    expect(result.current).toEqual([storedColorScheme, expect.any(Function)]);
  });

  it('should set colorScheme to localStorage', () => {
    const colorSchemeToStore = 'dark';

    const { result } = renderHook(() =>
      usePersistedColorScheme(defaultColorScheme)
    );

    const [, setColorScheme] = result.current;
    act(() => setColorScheme(colorSchemeToStore));

    const storedColorScheme = globalThis.localStorage.getItem(
      'fratch-color-scheme'
    );

    expect(defaultColorScheme).not.toEqual(storedColorScheme);
    expect(colorSchemeToStore).toEqual(storedColorScheme);
  });
});
