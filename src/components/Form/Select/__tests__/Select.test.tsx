import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Select from '../Select';
import type { SelectOption, SelectProps } from '../SelectProps';

describe('Select', () => {
  type TestOption = {
    id: string;
    label: string;
  };

  const options: SelectOption<TestOption>[] = [
    {
      label: 'Option 1',
      value: { id: '1', label: 'Option 1' },
    },
    {
      label: 'Option 2',
      value: { id: '2', label: 'Option 2' },
      visible: false,
    },
    {
      label: 'Option 3',
      value: { id: '3', label: 'Option 3' },
    },
    {
      label: 'Option 4',
      value: { id: '4', label: 'Option 4' },
    },
  ];

  const initialProps: SelectProps<TestOption> = {
    className: 'test-class',
    cleanable: true,
    searchable: true,
    id: 'mock-test-id',
    placeholder: 'Select an option',
    options,
    value: options[0].value,
  };

  const setup = (props = initialProps) => render(<Select {...props} />);

  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(
      'crypto-mock-random-UUID-1234'
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render properly', () => {
    const { baseElement } = setup();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render as visible on trigger click', async () => {
    const { baseElement } = setup();
    await userEvent.click(screen.getByRole('textbox', { name: /Option 1/i }));
    expect(baseElement).toMatchSnapshot();
  });

  it('should render as disabled', () => {
    const { container } = setup({
      ...initialProps,
      disabled: true,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render the options list displayer by ref', async () => {
    const triggerElementRef = React.createRef<HTMLInputElement>();
    setup({
      ...initialProps,
      triggerElementRef,
    });

    expect(triggerElementRef).toMatchSnapshot();
  });

  it('should perform onChange', async () => {
    const onChange = vi.fn();
    setup({
      ...initialProps,
      onChange,
    });

    await userEvent.click(screen.getByRole('link', { name: /Option 3/i }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ id: '3', label: 'Option 3' });
  });

  it('should render a filtered list of options', async () => {
    const { baseElement } = setup({
      ...initialProps,
      value: undefined,
    });
    const triggerElement = screen.getByRole('textbox');
    await userEvent.type(triggerElement, 'Option 3');
    expect(baseElement).toMatchSnapshot();
  });

  it('should perform onClean and clean filtered options', async () => {
    const onClean = vi.fn();
    const onChange = vi.fn();
    const { baseElement } = setup({
      ...initialProps,
      onClean,
      onChange,
    });

    await userEvent.click(screen.getByRole('button', { name: /clean/i }));

    expect(onClean).toHaveBeenCalledTimes(1);
    expect(onClean).toHaveBeenCalledWith();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(undefined);

    expect(baseElement).toMatchSnapshot();
  });
});
