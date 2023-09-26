import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import MockComponent from '../../../__mocks__/MockComponent';
import * as Icons from '../../Icons/Icons';
import { IconProps } from '../../Icons/Icons/IconProps';
import ToasterItem from '../ToasterItem';
import { Toaster, ToasterItemProps } from '../ToasterProps';

describe('ToasterItem', () => {
  const onClose = vi.fn();
  const initialToaster: Toaster = { type: 'info', duration: 100 };
  const initialProps = { onClose, toaster: initialToaster };

  const setup = (
    props: ToasterItemProps = initialProps
  ): ReturnType<typeof render> => {
    const { container, ...data } = render(<ToasterItem {...props} />);
    return {
      container,
      ...data,
    };
  };

  beforeEach(() => {
    vi.spyOn(Icons, 'IconClose').mockImplementation((props: IconProps) => (
      <MockComponent __testDisplayName="IconClose" {...props} />
    ));
    vi.spyOn(Icons, 'IconSuccess').mockImplementation((props: IconProps) => (
      <MockComponent __testDisplayName="IconSuccess" {...props} />
    ));
    vi.spyOn(Icons, 'IconError').mockImplementation((props: IconProps) => (
      <MockComponent __testDisplayName="IconError" {...props} />
    ));
    vi.spyOn(Icons, 'IconWarning').mockImplementation((props: IconProps) => (
      <MockComponent __testDisplayName="IconWarning" {...props} />
    ));
    vi.spyOn(Icons, 'IconInfo').mockImplementation((props: IconProps) => (
      <MockComponent __testDisplayName="IconInfo" {...props} />
    ));
    vi.spyOn(Icons, 'IconPin').mockImplementation((props: IconProps) => (
      <MockComponent __testDisplayName="IconPin" {...props} />
    ));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    onClose.mockClear();
  });

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with type success', () => {
    const toaster: Toaster = { ...initialToaster, type: 'success' };
    const { container } = setup({ ...initialProps, toaster });
    expect(container).toMatchSnapshot();
  });

  it('should render with type error', () => {
    const toaster: Toaster = { ...initialToaster, type: 'error' };
    const { container } = setup({ ...initialProps, toaster });
    expect(container).toMatchSnapshot();
  });

  it('should render with type warning', () => {
    const toaster: Toaster = { ...initialToaster, type: 'warning' };
    const { container } = setup({ ...initialProps, toaster });
    expect(container).toMatchSnapshot();
  });

  it('should render with type nlToBr', () => {
    const message = `
      line 1
            line 2`;
    const toaster: Toaster = { ...initialToaster, message, nlToBr: true };
    const { container } = setup({ ...initialProps, toaster });
    expect(container).toMatchSnapshot();
  });

  it('should render with title', () => {
    const toaster: Toaster = { ...initialToaster, title: 'mock title' };
    const { container } = setup({ ...initialProps, toaster });
    expect(container).toMatchSnapshot();
  });

  it('should render with message', () => {
    const toaster: Toaster = { ...initialToaster, message: 'mock message' };
    const { container } = setup({ ...initialProps, toaster });
    expect(container).toMatchSnapshot();
  });

  it('should render when is stoppable with duration 0', () => {
    const toaster: Toaster = {
      ...initialToaster,
      duration: 0,
      stoppable: true,
    };
    const { container } = setup({ ...initialProps, toaster });
    expect(container).toMatchSnapshot();
  });

  it('should render when is stoppable with duration is greater than 2999 ms', async () => {
    const toaster: Toaster = {
      ...initialToaster,
      duration: 3000,
      stoppable: true,
    };
    const { container } = setup({ ...initialProps, toaster });

    await userEvent.click(screen.getByRole('button', { name: /pin/ }));

    expect(container).toMatchSnapshot();
  });

  it('should render when is stoppable but duration is 2999 ms', async () => {
    const toaster: Toaster = {
      ...initialToaster,
      duration: 2999,
      stoppable: true,
    };
    const { container } = setup({ ...initialProps, toaster });

    expect(container).toMatchSnapshot();
  });

  it('should render when is stoppable with duration 0 and was pinned', async () => {
    const toaster: Toaster = {
      ...initialToaster,
      duration: 0,
      stoppable: true,
    };
    const { container } = setup({ ...initialProps, toaster });

    await userEvent.click(screen.getByRole('button', { name: /pin/ }));

    expect(container).toMatchSnapshot();
  });

  it('should perform onClose with duration 0', async () => {
    const toasterId = 'mock-id';
    const toaster: Toaster = { type: 'info', duration: 0, id: toasterId };

    const { container } = setup({ ...initialProps, toaster });

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(toasterId);
    });

    expect(container).toMatchSnapshot();
  });

  it('should perform closer after duration', async () => {
    const toasterId = 'mock-id';
    const toaster: Toaster = { type: 'info', duration: 100, id: toasterId };

    const { container } = setup({ ...initialProps, toaster });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(toasterId);
    });

    expect(container).toMatchSnapshot();
  });
});
