import { type CSSProperties } from 'react';

import { AVAILABLE_COLOR_LIST } from './colorConstants';

export const hexToRgb = (
  hex: string | CSSProperties['color']
): number[] | null => {
  const match = hex
    ?.toString()
    .match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return match.slice(1).map(x => parseInt(x, 16));
};

export const getContrastColor = (
  color: string | CSSProperties['color']
): 'var(--ft-color-lightest)' | 'var(--ft-color-darkest)' => {
  if (color === 'var(--ft-color-darkest)') return 'var(--ft-color-lightest)';
  if (color === 'var(--ft-color-lightest)') return 'var(--ft-color-darkest)';

  const rgb = hexToRgb(color);
  if (!rgb) return 'var(--ft-color-darkest)';
  const [r, g, b] = rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128
    ? 'var(--ft-color-darkest)'
    : 'var(--ft-color-lightest)';
};

export function getRandomColor(
  excludedColors?: CSSProperties['color'][]
): CSSProperties['color'] {
  const colors = AVAILABLE_COLOR_LIST.filter(
    color => !(excludedColors ?? []).includes(color)
  );
  const indexColor = Math.floor(Math.random() * colors.length);
  const color = colors[indexColor];
  return color;
}
