import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TabEditable from '../TabEditable';
import { type TabEditableProps } from '../TabEditableProps';

describe('TabEditable', () => {
  const setup = (props: TabEditableProps = {}) =>
    render(<TabEditable {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with label', () => {
    const { container } = setup({ label: 'label-test' });
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({ className: 'className-test' });
    expect(container).toMatchSnapshot();
  });

  it('should render with editable', () => {
    const { container } = setup({ editable: true });
    expect(container).toMatchSnapshot();
  });

  it('should render in edition mode', async () => {
    const { container } = setup({ label: 'label-value-test', editable: true });

    await userEvent.click(
      screen.getByRole('button', {
        name: /Edit tag/i,
      })
    );

    expect(container).toMatchSnapshot();
  });

  it('should perform onChange on input field blur', async () => {
    const onChange = vi.fn();
    setup({
      label: 'current-label',
      editable: true,
      onChange,
    });

    await userEvent.click(
      screen.getByRole('button', {
        name: /Edit tag/i,
      })
    );

    const inputElement = screen.getByRole('textbox', { name: /Edit tag/i });

    expect(inputElement).toBeInTheDocument();
    await userEvent.click(inputElement);
    await userEvent.type(inputElement, '-and-new-value');
    fireEvent.blur(inputElement);
    expect(inputElement).not.toBeInTheDocument();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('current-label-and-new-value');
  });

  it('should perform onChange on keyDown Enter', async () => {
    const onChange = vi.fn();
    setup({
      label: 'current-label',
      editable: true,
      onChange,
    });

    await userEvent.click(
      screen.getByRole('button', {
        name: /Edit tag/i,
      })
    );

    const inputElement = screen.getByRole('textbox', { name: /Edit tag/i });

    expect(inputElement).toBeInTheDocument();
    await userEvent.click(inputElement);
    await userEvent.type(inputElement, '-and-new-value');
    await userEvent.keyboard('{enter}');
    expect(inputElement).not.toBeInTheDocument();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('current-label-and-new-value');
  });
});
