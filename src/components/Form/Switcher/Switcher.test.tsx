import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { IconCheck } from '../../Icons/Icons';
import Switcher from './Switcher';
import { type SwitcherProps } from './SwitcherProps';

describe('Switcher', () => {
  const getComponent = (props: SwitcherProps = {}) => <Switcher {...props} />;
  const setup = (props = {}) => render(getComponent(props));

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with IconOff', () => {
    const { container } = setup({
      IconOff: IconCheck,
      value: false,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with IconOn', () => {
    const { container } = setup({
      IconOn: IconCheck,
      value: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with label left', () => {
    const { container } = setup({
      labelLeft: 'mock label left',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with label right', () => {
    const { container } = setup({
      labelRight: 'mock label right',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with title', () => {
    const { container } = setup({
      title: 'mock title',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({
      className: 'mock-class-name',
    });
    expect(container).toMatchSnapshot();
  });
});
