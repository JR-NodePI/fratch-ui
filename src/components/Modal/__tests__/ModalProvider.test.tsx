import { useContext } from 'react';
import { act } from 'react-dom/test-utils';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import debounce from 'lodash/debounce';
import { describe, expect, it, vi } from 'vitest';

import ModalContext from '../ModalContext';
import { type ShowModalProps } from '../ModalProps';
import ModalProvider from '../ModalProvider';

vi.mock('lodash/debounce', async requireActual => {
  const module = (await requireActual()) as { default: typeof debounce };
  return { default: vi.fn(fn => module.default(fn, 10)) };
});

describe('Modal', () => {
  const modalId = 'crypto-mock-random-UUID-1234';

  let triggerShowModalAccept: (props: ShowModalProps) => void;
  let triggerShowModalConfirm: (props: ShowModalProps) => void;
  let triggerShowModalInfo: (props: ShowModalProps) => void;

  const MockComponent = (): JSX.Element => {
    const { showModalAccept, showModalConfirm, showModalInfo } =
      useContext(ModalContext);

    triggerShowModalAccept = showModalAccept;
    triggerShowModalConfirm = showModalConfirm;
    triggerShowModalInfo = showModalInfo;

    return <p>Mock contents</p>;
  };

  const getComponent = (): JSX.Element => (
    <ModalProvider>
      <MockComponent />
    </ModalProvider>
  );

  const setup = (): ReturnType<typeof render> => render(getComponent());

  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(modalId);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly', () => {
    const { baseElement } = setup();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render an accept Modal', () => {
    const { baseElement } = setup();

    act(() => {
      triggerShowModalAccept({
        title: 'Accept modal title',
        children: <>Accept modal content</>,
      });
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render a confirm Modal', () => {
    const { baseElement } = setup();

    act(() => {
      triggerShowModalConfirm({
        title: 'Confirm modal title',
        children: <>Confirm modal content</>,
      });
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render a info Modal', () => {
    const { baseElement } = setup();

    act(() => {
      triggerShowModalInfo({
        title: 'Info modal title',
        children: <>Info modal content</>,
      });
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should call onOpen and onClose an accept Modal', async () => {
    setup();

    const onOpen = vi.fn();
    const onClose = vi.fn();

    act(() => {
      triggerShowModalAccept({
        title: 'Accept modal title',
        children: <>Accept modal content</>,
        onClose,
        onOpen,
      });
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen).toHaveBeenCalledWith();

    await userEvent.click(screen.getByRole('button', { name: /Close/i }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith('close');
    });

    expect(debounce).toHaveBeenCalledTimes(2);
    expect(debounce).toHaveBeenNthCalledWith(1, expect.any(Function), 100);
    expect(debounce).toHaveBeenNthCalledWith(2, expect.any(Function), 500);
  });
});
