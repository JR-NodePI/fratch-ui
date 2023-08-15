import { ColorSchemeProviderProps } from './ColorScheme';
import ColorSchemeContext from './ColorSchemeContext';
import useColorSchemeMediaQuery from './useColorSchemeMediaQuery';

export default function ColorSchemeProvider({
  children,
}: ColorSchemeProviderProps): JSX.Element {
  const [colorScheme, setColorScheme] = useColorSchemeMediaQuery();

  return (
    <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
