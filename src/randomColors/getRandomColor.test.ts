import { CSSProperties } from 'react';

import { describe, expect, it } from 'vitest';

import { AVAILABLE_COLOR_LIST } from './constants';
import getRandomColor from './getRandomColor';

describe('getRandomColor', () => {
  it('should go over the list of available color sorting randomly', () => {
    let usedColors: CSSProperties['color'][];

    AVAILABLE_COLOR_LIST.forEach(() => {
      const randomColor = getRandomColor(usedColors);

      expect(AVAILABLE_COLOR_LIST).toContain(randomColor);
      expect(usedColors ?? []).not.toContain(randomColor);

      usedColors = [...(usedColors ?? []), randomColor];
    });
  });
});
