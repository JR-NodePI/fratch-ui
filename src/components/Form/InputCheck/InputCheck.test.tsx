import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InputCheck from './InputCheck';
import { type InputCheckProps } from './InputCheckProps';

describe('InputCheck', () => {
  const initialProps: InputCheckProps = {
    label: 'mock label',
  };

  const getComponent = (
    props: InputCheckProps = initialProps,
    ref?: React.ForwardedRef<HTMLInputElement>
  ) => <InputCheck ref={ref} {...props} />;

  const setup = (
    props = initialProps,
    ref?: React.ForwardedRef<HTMLInputElement>
  ) => render(getComponent(props, ref));

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should be checked', async () => {
    setup({
      ...initialProps,
      checked: true,
    });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should de disabled', () => {
    setup({
      ...initialProps,
      disabled: true,
    });
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should render with className', () => {
    const { container } = setup({
      ...initialProps,
      className: 'mock-class',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render with label', () => {
    const { container } = setup({
      ...initialProps,
      label: 'mock label',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render position right', () => {
    const { container } = setup({
      ...initialProps,
      position: 'right',
    });
    expect(container).toMatchSnapshot();
  });

  it('should perform onChange', async () => {
    const label = 'mock-test-label';
    const onChange = vi.fn();

    setup({ ...initialProps, label, onChange });
    await userEvent.click(screen.getByLabelText(label));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should set the forwarded ref', async () => {
    const ref = createRef<HTMLInputElement>();
    setup(initialProps, ref);

    expect(ref).toMatchSnapshot();
  });
});
