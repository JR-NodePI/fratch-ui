import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Spinner from './Spinner';
import { type SpinnerProps } from './SpinnerProps';

describe('Spinner', () => {
  const setup = (props: SpinnerProps = {}) => render(<Spinner {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({});
    expect(container).toMatchSnapshot();
  });
});
