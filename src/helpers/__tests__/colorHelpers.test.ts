import { type CSSProperties } from 'react';

import { describe, expect, it } from 'vitest';

import { AVAILABLE_COLOR_LIST } from '../colorConstants';
import { getContrastColor, getRandomColor, hexToRgb } from '../colorHelpers';

describe('colorHelpers', () => {
  describe('hexToRgb', () => {
    it('should return null from an invalid CSS hexadecimal one', () => {
      const result = hexToRgb('invalid-color');
      expect(result).toBeNull();
    });

    it('should return an RGB array from a CSS hexadecimal one', () => {
      const result = hexToRgb('#6bd700');
      expect(result).toEqual([107, 215, 0]);
    });
  });

  describe('getContrastColor', () => {
    it('should return var(--ft-color-darkest) from an invalid CSS color', () => {
      const result = getContrastColor('invalid-color');
      expect(result).toBe('var(--ft-color-darkest)');
    });

    it('should return var(--ft-color-darkest) from  var(--ft-color-lightest)', () => {
      const result = getContrastColor('var(--ft-color-lightest)');
      expect(result).toBe('var(--ft-color-darkest)');
    });

    it('should return var(--ft-color-lightest) from  var(--ft-color-darkest)', () => {
      const result = getContrastColor('var(--ft-color-darkest)');
      expect(result).toBe('var(--ft-color-lightest)');
    });

    it('should return var(--ft-color-darkest) from a light CSS color', () => {
      const result = getContrastColor('#6bd700');
      expect(result).toBe('var(--ft-color-darkest)');
    });

    it('should return var(--ft-color-lightest) from a dark CSS color', () => {
      const result = getContrastColor('#006aff');
      expect(result).toBe('var(--ft-color-lightest)');
    });
  });

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
});
