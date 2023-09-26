import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { IconType } from '../IconConstants';
import IconContainer from '../IconContainer';
import { type IconContainerProps } from '../IconContainerProps';

describe('Button', () => {
  const setup = (
    props: Omit<IconContainerProps, 'children'> = {}
  ): ReturnType<typeof render> =>
    render(
      <IconContainer {...props}>
        {({ iconClassName }): JSX.Element => <svg className={iconClassName} />}
      </IconContainer>
    );

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  describe('should render with TYPE', () => {
    Object.values(IconType).forEach(type => {
      it(type, () => {
        const { container } = setup({ type });
        expect(container).toMatchSnapshot();
      });
    });
  });

  it('should render with className', () => {
    const { container } = setup({
      className: 'mock_test_class_name',
    });
    expect(container).toMatchSnapshot();
  });
});
