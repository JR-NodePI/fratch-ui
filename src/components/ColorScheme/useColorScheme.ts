import { useContext } from 'react';

import ColorSchemeContext from './ColorSchemeContext';

export default function useColorScheme() {
  return useContext(ColorSchemeContext);
}
