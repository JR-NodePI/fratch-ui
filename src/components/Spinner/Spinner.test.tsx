import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Spinner from './Spinner';
import { type SpinnerProps } from './SpinnerProps';

describe('Spinner', () => {
  const setup = (props: SpinnerProps = {}): ReturnType<typeof render> =>
    render(<Spinner {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with cover', () => {
    const { container } = setup({
      cover: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with inverted', () => {
    const { container } = setup({
      inverted: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with label', () => {
    const { container } = setup({
      label: 'mock label',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with type', () => {
    const { container } = setup({
      type: 'secondary',
    });
    expect(container).toMatchSnapshot();
  });
});
