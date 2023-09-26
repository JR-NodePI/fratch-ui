import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ButtonCloser from './ButtonCloser';
import { type ButtonCloserProps } from './ButtonCloserProps';

describe('ButtonCloser', () => {
  const setup = (props: ButtonCloserProps = {}): ReturnType<typeof render> =>
    render(<ButtonCloser title="Test button" {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({
      className: 'mock_test_class_name',
    });
    expect(container).toMatchSnapshot();
  });

  it('should perform onClick', async () => {
    const mockOnClick = vi.fn();

    setup({ title: 'mock-test-button', onClick: mockOnClick });

    await userEvent.click(
      screen.getByRole('button', { name: /mock-test-button/i })
    );

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith();
  });
});
