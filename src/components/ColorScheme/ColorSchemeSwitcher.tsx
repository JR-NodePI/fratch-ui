import { c } from '../../helpers/classNameHelpers';
import Switcher from '../Form/Switcher/Switcher';
import { IconDark, IconLight } from '../Icons/Icons';
import { COLOR_SCHEMES } from './colorSchemeConstants';
import useColorScheme from './useColorScheme';

export default function ColorSchemeSwitcher({
  className,
}: {
  className?: string;
}): JSX.Element {
  const [colorSchema, setColorSchema] = useColorScheme();
  const oppositeColorSchema =
    colorSchema === COLOR_SCHEMES.LIGHT
      ? COLOR_SCHEMES.DARK
      : COLOR_SCHEMES.LIGHT;
  const handleToggleColorSchema = (switchOn: boolean): void => {
    setColorSchema(switchOn ? COLOR_SCHEMES.DARK : COLOR_SCHEMES.LIGHT);
  };

  const title = `Switch to ${oppositeColorSchema} mode`;
  const defaultSwitchOn = colorSchema === COLOR_SCHEMES.DARK;
  return (
    <Switcher
      className={c(className)}
      title={title}
      labelLeft="Color scheme"
      IconOff={IconLight}
      IconOn={IconDark}
      defaultSwitchOn={defaultSwitchOn}
      onChange={handleToggleColorSchema}
    />
  );
}
