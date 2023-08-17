import { renderHook } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { ColorSchemeProviderProps } from '../ColorScheme';
import ColorSchemeContext from '../ColorSchemeContext';
import useColorScheme from '../useColorScheme';

describe('useColorScheme', () => {
  const colorScheme = 'light';
  const setColorScheme = vi.fn();

  const wrapper = ({ children }: ColorSchemeProviderProps) => (
    <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
      {children}
    </ColorSchemeContext.Provider>
  );

  it('should return the value from ColorSchemeContext', () => {
    const { result } = renderHook(() => useColorScheme(), { wrapper });
    expect(result.current).toEqual([colorScheme, setColorScheme]);
  });
});
