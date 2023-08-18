import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header';
import { type HeaderProps } from './HeaderProps';

describe('Header', () => {
  const getComponent = (props: HeaderProps = {}) => <Header {...props} />;
  const setup = (props = {}) => render(getComponent(props));

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with iconSrc', () => {
    const { container } = setup({ iconSrc: 'icon.png' });
    expect(container).toMatchSnapshot();
  });

  it('should render with title', () => {
    const { container } = setup({ title: 'mock title' });
    expect(container).toMatchSnapshot();
  });

  it('should render with iconPosition right', () => {
    const { container } = setup({ iconSrc: 'icon.png', iconPosition: 'right' });
    expect(container).toMatchSnapshot();
  });
});
