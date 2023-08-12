import { COLOR_SCHEMES } from './colorSchemeConstants';

export type ColorScheme = (typeof COLOR_SCHEMES)[keyof typeof COLOR_SCHEMES];

export type ColorSchemeOutput = {
  colorScheme: ColorScheme;
  setColorScheme: (data: ColorScheme) => void;
};
