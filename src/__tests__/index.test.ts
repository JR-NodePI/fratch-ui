import { describe, expect, it } from 'vitest';

import * as components from '../components';
import * as helpers from '../helpers';

describe('index', () => {
  it('should have a list of components', () => {
    expect(components).toMatchSnapshot();
  });
  it('should have a list of helpers', () => {
    expect(helpers).toMatchSnapshot();
  });
});
