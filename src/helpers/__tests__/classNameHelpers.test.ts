import { describe, expect, it } from 'vitest';

import { c } from '../classNameHelpers';

describe('classNameHelpers', () => {
  describe('c', () => {
    it('should return a clean list of class names from params', () => {
      const result = c(
        'class1 ',
        ' class2',
        'class3  class4',
        '',
        null,
        ' ',
        undefined,
        ['class5     class6', 'class7 ', ' ', '', undefined, null]
      );
      expect(result).toBe('class1 class2 class3 class4 class5 class6 class7');
    });
  });
});
