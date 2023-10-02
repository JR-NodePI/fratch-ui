import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { IconCheck } from '../Icons/Icons';
import Button from './Button';
import { ButtonSize, ButtonType } from './ButtonConstants';
import { type ButtonProps } from './ButtonProps';

describe('Button', () => {
  const setup = (props: ButtonProps = {}): ReturnType<typeof render> =>
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

    const buttonElement = screen.getByRole('button', {
      name: /mock-test-button/i,
    });
    await userEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'click',
        target: buttonElement,
      })
    );
  });
});
