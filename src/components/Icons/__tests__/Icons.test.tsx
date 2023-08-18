import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as icons from '../Icons';

describe('Icons', () => {
  describe('should render properly', () => {
    Object.entries(icons).forEach(([name, Icon]) => {
      it(name, () => {
        const { container } = render(<Icon />);
        expect(container).toMatchSnapshot();
      });
    });
  });
});
