import { act } from 'react-dom/test-utils';

import { renderHook } from '@testing-library/react';
import { describe, it } from 'vitest';

import usePersistedColorScheme from '../usePersistedColorScheme';

describe('usePersistedColorScheme', () => {
  afterEach(() => {
    globalThis.localStorage.clear();
  });

  it('should return the defaultColorScheme and colorScheme setter', () => {
    const defaultColorScheme = 'light';
    const { result } = renderHook(() =>
      usePersistedColorScheme(defaultColorScheme)
    );
    expect(result.current).toEqual([defaultColorScheme, expect.any(Function)]);
  });

  it('should return the dark colorScheme from localStorage', () => {
    const defaultColorScheme = 'light';
    const storedColorScheme = 'dark';
    globalThis.localStorage.setItem('fratch-color-scheme', storedColorScheme);

    const { result } = renderHook(() =>
      usePersistedColorScheme(defaultColorScheme)
    );

    expect(defaultColorScheme).not.toEqual(storedColorScheme);
    expect(result.current).toEqual([storedColorScheme, expect.any(Function)]);
  });

  it('should return the light colorScheme from localStorage', () => {
    const defaultColorScheme = 'dark';
    const storedColorScheme = 'light';
    globalThis.localStorage.setItem('fratch-color-scheme', storedColorScheme);

    const { result } = renderHook(() =>
      usePersistedColorScheme(defaultColorScheme)
    );

    expect(defaultColorScheme).not.toEqual(storedColorScheme);
    expect(result.current).toEqual([storedColorScheme, expect.any(Function)]);
  });

  it('should set dark colorScheme to localStorage', () => {
    const defaultColorScheme = 'light';
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
