import { createContext } from 'react';

import type { ColorScheme } from './ColorScheme';
import { COLOR_SCHEMES } from './colorSchemeConstants';

const ColorSchemeContext = createContext<
  [colorScheme: ColorScheme, setColorScheme: (data: ColorScheme) => void]
>([COLOR_SCHEMES.LIGHT, () => {}]);

ColorSchemeContext.displayName = 'ColorSchemeContext';

export default ColorSchemeContext;
