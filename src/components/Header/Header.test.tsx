import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header';
import { type HeaderProps } from './HeaderProps';

describe('Header', () => {
  const setup = (props: HeaderProps = {}): ReturnType<typeof render> =>
    render(<Header {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with title', () => {
    const { container } = setup({ title: 'mock title' });
    expect(container).toMatchSnapshot();
  });

  it('should render with iconPosition right', () => {
    const { container } = setup({ iconPosition: 'right' });
    expect(container).toMatchSnapshot();
  });

  it('should render with imgLogo', () => {
    const { container } = setup({ imgLogo: 'mock-imgLogo' });
    expect(container).toMatchSnapshot();
  });
});
