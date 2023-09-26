import { useEffect } from 'react';

import type { ColorSchemeOutput } from './ColorScheme';
import { COLOR_SCHEMES } from './colorSchemeConstants';
import usePersistedColorScheme from './usePersistedColorScheme';

const COLOR_SCHEME_DATA_ATTR_NAME = 'data-fratch_color_scheme';
const COLOR_SCHEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export default function useColorSchemeMediaQuery(): ColorSchemeOutput {
  const initialColorScheme = window.matchMedia(COLOR_SCHEME_MEDIA_QUERY).matches
    ? COLOR_SCHEMES.DARK
    : COLOR_SCHEMES.LIGHT;
  const [colorScheme, setColorScheme] =
    usePersistedColorScheme(initialColorScheme);

  useEffect(() => {
    document.body.setAttribute(COLOR_SCHEME_DATA_ATTR_NAME, colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent): void => {
      setColorScheme(e.matches ? COLOR_SCHEMES.DARK : COLOR_SCHEMES.LIGHT);
    };

    window
      .matchMedia(COLOR_SCHEME_MEDIA_QUERY)
      .addEventListener('change', handler);

    return () => {
      window
        .matchMedia(COLOR_SCHEME_MEDIA_QUERY)
        .removeEventListener('change', handler);
    };
  }, [setColorScheme]);

  return [colorScheme, setColorScheme];
}
