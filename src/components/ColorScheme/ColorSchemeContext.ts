import { createContext } from 'react';

import type { ColorSchemeOutput } from './ColorScheme';
import { COLOR_SCHEMES } from './colorSchemeConstants';

const ColorSchemeContext = createContext<ColorSchemeOutput>([
  COLOR_SCHEMES.LIGHT,
  (): void => {},
]);

ColorSchemeContext.displayName = 'ColorSchemeContext';

export default ColorSchemeContext;
