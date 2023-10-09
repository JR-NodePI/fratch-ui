import { useCallback } from 'react';

import { c } from '../../helpers';
import Switcher from '../Form/Switcher/Switcher';
import { IconDark, IconLight } from '../Icons';
import { ColorSchemeSwitcherProps } from './ColorScheme';
import { COLOR_SCHEMES } from './colorSchemeConstants';
import useColorScheme from './useColorScheme';

export default function ColorSchemeSwitcher({
  className,
}: ColorSchemeSwitcherProps): JSX.Element {
  const [colorSchema, setColorScheme] = useColorScheme();
  const oppositeColorSchema =
    colorSchema === COLOR_SCHEMES.LIGHT
      ? COLOR_SCHEMES.DARK
      : COLOR_SCHEMES.LIGHT;

  const handleToggleColorSchema = useCallback(
    (switchOn: boolean): void => {
      setColorScheme(switchOn ? COLOR_SCHEMES.DARK : COLOR_SCHEMES.LIGHT);
    },
    [setColorScheme]
  );

  const title = `Switch to ${oppositeColorSchema} mode`;
  const switchOn = colorSchema === COLOR_SCHEMES.DARK;
  return (
    <Switcher
      className={c(className)}
      title={title}
      labelLeft="color scheme"
      IconOff={IconLight}
      IconOn={IconDark}
      value={switchOn}
      onChange={handleToggleColorSchema}
    />
  );
}
