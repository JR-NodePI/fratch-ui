import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InputText from './InputText';
import { type InputTextProps } from './InputTextProps';

describe('InputText', () => {
  const initialProps: InputTextProps = {};

  const setup = (
    props = initialProps,
    ref?: React.ForwardedRef<HTMLInputElement>
  ) => render(<InputText ref={ref} {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with id', () => {
    const { container } = setup({
      ...initialProps,
      id: 'mock-id',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with title', () => {
    const { container } = setup({
      ...initialProps,
      title: 'mock-title',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with type', () => {
    const { container } = setup({
      ...initialProps,
      type: 'password',
    });
    expect(container).toMatchSnapshot();
  });

  it('should be disabled', () => {
    setup({
      ...initialProps,
      disabled: true,
    });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should be readOnly', () => {
    setup({
      ...initialProps,
      readOnly: true,
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('should be cleanable, perform onClean and onChange', async () => {
    const onClean = vi.fn();
    const onChange = vi.fn();
    const mockInitialValue = 'mock-initial-value';

    const { container } = setup({
      ...initialProps,
      cleanable: true,
      value: mockInitialValue,
      cleanerClassName: 'mock-cleaner-class',
      onClean,
      onChange,
    });

    const textBoxElement = screen.getByRole('textbox');
    expect(textBoxElement).toHaveValue(mockInitialValue);

    await userEvent.click(screen.getByRole('button'));

    expect(textBoxElement).toHaveValue('');
    expect(textBoxElement).toHaveFocus();

    expect(onClean).toHaveBeenCalledTimes(1);
    expect(onClean).toHaveBeenCalledWith(textBoxElement);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith();

    expect(container).toMatchSnapshot();
  });

  it('should perform onChange', async () => {
    const onChange = vi.fn();
    const mockInitialValue = 'mock-initial-value';

    setup({
      ...initialProps,
      value: mockInitialValue,
      onChange,
    });

    const textBoxElement = screen.getByRole('textbox');
    expect(textBoxElement).toHaveValue(mockInitialValue);

    await userEvent.type(textBoxElement, '1234');

    const mockEvent = expect.objectContaining({
      target: textBoxElement,
      type: 'change',
    });
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenCalledWith(mockEvent);
  });

  it('should perform onFocus and then perform onBlur', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    setup({
      ...initialProps,
      onFocus,
      onBlur,
    });

    const textBoxElement = screen.getByRole('textbox');
    await userEvent.click(textBoxElement);

    const mockEventFocus = expect.objectContaining({
      target: textBoxElement,
      type: 'focus',
    });
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(mockEventFocus);
    expect(textBoxElement).toHaveFocus();

    await userEvent.tab();

    const mockEventBlur = expect.objectContaining({
      target: textBoxElement,
      type: 'blur',
    });
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(mockEventBlur);
    expect(textBoxElement).not.toHaveFocus();
  });

  it('should perform onClick', async () => {
    const onClick = vi.fn();

    setup({
      ...initialProps,
      onClick,
    });

    const textBoxElement = screen.getByRole('textbox');
    await userEvent.click(textBoxElement);

    const mockEvent = expect.objectContaining({
      target: textBoxElement,
      type: 'click',
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(mockEvent);
  });

  it('should perform onKeyDownCapture', async () => {
    const onKeyDownCapture = vi.fn();

    setup({
      ...initialProps,
      onKeyDownCapture,
    });

    const keyboardKeys = {
      A: 'A',
      a: 'a',
      '{enter}': 'Enter',
      '{backspace}': 'Backspace',
      '{delete}': 'Delete',
      '{tab}': 'Tab',
    };

    const keyboardKeyNames = Object.keys(keyboardKeys);
    const keyboardKeyValues = Object.values(keyboardKeys);

    const textBoxElement = screen.getByRole('textbox');
    await userEvent.click(textBoxElement);
    await userEvent.keyboard(keyboardKeyNames.join(''));

    expect(onKeyDownCapture).toHaveBeenCalledTimes(keyboardKeyValues.length);
    keyboardKeyValues.forEach(key => {
      const mockEvent = expect.objectContaining({
        target: textBoxElement,
        type: 'keydown',
        key,
      });
      expect(onKeyDownCapture).toHaveBeenCalledWith(mockEvent);
    });
  });

  it('should render with className', () => {
    const { container } = setup({
      ...initialProps,
      className: 'mock-class',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with placeholder', () => {
    const { container } = setup({
      ...initialProps,
      placeholder: 'mock-placeholder',
    });
    expect(container).toMatchSnapshot();
  });

  it('should set the forwarded ref', async () => {
    const ref = createRef<HTMLInputElement>();
    setup(initialProps, ref);

    expect(ref).toMatchSnapshot();
  });
});
