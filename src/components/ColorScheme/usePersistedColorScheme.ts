import { useCallback, useState } from 'react';

import type { ColorScheme, ColorSchemeOutput } from './ColorScheme';
import { COLOR_SCHEMES } from './colorSchemeConstants';

const COLOR_SCHEME_STORED_KEY = 'fratch-color-scheme';

export default function usePersistedColorScheme(
  defaultColorScheme: ColorScheme
): ColorSchemeOutput {
  const storedData = globalThis.localStorage.getItem(COLOR_SCHEME_STORED_KEY);

  const [colorScheme, setInnerColorScheme] = useState<ColorScheme>(
    storedData === COLOR_SCHEMES.DARK
      ? COLOR_SCHEMES.DARK
      : storedData === COLOR_SCHEMES.LIGHT
        ? COLOR_SCHEMES.LIGHT
        : defaultColorScheme
  );

  const setColorScheme = useCallback((newColorScheme: ColorScheme): void => {
    globalThis.localStorage.setItem(COLOR_SCHEME_STORED_KEY, newColorScheme);
    setInnerColorScheme(newColorScheme);
  }, []);

  return [colorScheme, setColorScheme];
}
