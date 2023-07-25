import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import IconContainer from '../IconContainer';
import { type IconProps, IconType } from '../IconProps';

describe('Button.tsx', () => {
  const svg = <svg></svg>;

  const setup = (props: IconProps = { svg }) =>
    render(<IconContainer {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  describe('should render with TYPE', () => {
    Object.values(IconType).forEach(type => {
      it(type, () => {
        const { container } = setup({ type, svg });
        expect(container).toMatchSnapshot();
      });
    });
  });

  it('should render with className', () => {
    const { container } = setup({
      className: 'mock_test_class_name',
      svg,
    });
    expect(container).toMatchSnapshot();
  });
});
