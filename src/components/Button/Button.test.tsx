import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import IconCheck from '../Icon/IconCheck';
import Button from './Button';
import { ButtonProps, ButtonSize, ButtonType } from './ButtonProps';

describe('Button.tsx', () => {
  const setup = (props: ButtonProps = {}) =>
    render(<Button label="Test button" {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  describe('should render with SIZE', () => {
    Object.values(ButtonSize).forEach(size => {
      it(size, () => {
        const { container } = setup({ size });
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('should render with TYPE', () => {
    Object.values(ButtonType).forEach(type => {
      it(type, () => {
        const { container } = setup({ type });
        expect(container).toMatchSnapshot();
      });
    });
  });

  it('should render with children over label', () => {
    const { container } = setup({
      children: 'Test children',
      label: 'Test label',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with stretch', () => {
    const { container } = setup({
      stretch: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with isRound', () => {
    const { container } = setup({
      isRound: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with Icon', () => {
    const { container } = setup({
      Icon: IconCheck,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({
      className: 'mock_test_class_name',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with disabled', () => {
    const { container } = setup({
      disabled: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should perform onClick', async () => {
    const mockOnClick = vi.fn();

    setup({ label: 'mock-test-button', onClick: mockOnClick });

    await userEvent.click(
      screen.getByRole('button', { name: /mock-test-button/i })
    );

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith();
  });
});
