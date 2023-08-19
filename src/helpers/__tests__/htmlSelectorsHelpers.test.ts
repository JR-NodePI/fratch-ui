import { describe, expect, it } from 'vitest';

import { isAscendantEvenTargetByID } from '../htmlSelectorsHelpers';

describe('htmlSelectorsHelpers', () => {
  describe('isAscendantEvenTargetByID', () => {
    const ascendantID = 'ascendantElementID';
    const childID = 'childElementID';
    const childEvent = new MouseEvent('click');

    beforeEach(() => {
      window.document.body.innerHTML = `
        <div id="${ascendantID}">
          <div>
            <div>
              <div id="${childID}">Child item</div>
            </div>
          </div>
        </div>
      `;

      const childElement = window.document.getElementById(childID);

      Object.defineProperty(childEvent, 'target', {
        value: childElement,
        writable: true,
      });
    });

    afterEach(() => {
      window.document.body.innerHTML = '';
    });

    it('should return false when the child element have not identified ascendant element', () => {
      const result = isAscendantEvenTargetByID(childEvent, 'invalidID');
      expect(result).toBe(false);
    });

    it('should return true when the child element have the identified ascendant element', () => {
      const result = isAscendantEvenTargetByID(childEvent, ascendantID);
      expect(result).toBe(true);
    });
  });
});
