import { ReactNode } from 'react';

import ColorSchemeContext from './ColorSchemeContext';
import useColorSchemeMediaQuery from './useColorSchemeMediaQuery';

export default function ColorSchemeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { colorScheme, setColorScheme } = useColorSchemeMediaQuery();

  return (
    <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
