import { CSSProperties } from 'react';

import { COLOR_LIST_FOR_RANDOMIZE } from '../constants';

export default function getRandomColor(
  excludedColors?: CSSProperties['color'][]
): CSSProperties['color'] {
  const colors = COLOR_LIST_FOR_RANDOMIZE.filter(
    color => !(excludedColors ?? []).includes(color)
  );
  const indexColor = Math.floor(Math.random() * colors.length);
  const color = colors[indexColor];
  return color;
}
