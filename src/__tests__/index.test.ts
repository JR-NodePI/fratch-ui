import { describe, expect, it } from 'vitest';

import * as components from '../index';

describe('index', () => {
  it('should have a list of components', () => {
    expect(components).toMatchSnapshot();
  });
});
