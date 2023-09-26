import { useContext } from 'react';

import { ColorSchemeOutput } from './ColorScheme';
import ColorSchemeContext from './ColorSchemeContext';

export default function useColorScheme(): ColorSchemeOutput {
  return useContext(ColorSchemeContext);
}
