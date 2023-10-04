import { act } from 'react-dom/test-utils';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { debounce } from 'lodash';
import { describe, expect, it, vi } from 'vitest';

import {
  MODAL_TIMEOUT_TO_CLOSE,
  MODAL_TIMEOUT_TO_OPEN,
} from '../ModalConstants';
import { type ShowModalProps } from '../ModalProps';
import ModalProvider from '../ModalProvider';
import useModal from '../useModal';

vi.mock('lodash', async requireActual => {
  const module = (await requireActual()) as { debounce: typeof debounce };
  return { debounce: vi.fn(fn => module.debounce(fn, 10)) };
});

describe('Modal', () => {
  const modalId = 'crypto-mock-random-UUID-1234';

  let triggerShowModalAccept: (props: ShowModalProps) => void;
  let triggerShowModalConfirm: (props: ShowModalProps) => void;
  let triggerShowModalInfo: (props: ShowModalProps) => void;

  const MockComponent = (): JSX.Element => {
    const { showModalAccept, showModalConfirm, showModalInfo } = useModal();

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
        content: <>Accept modal content</>,
      });
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render a confirm Modal', () => {
    const { baseElement } = setup();

    act(() => {
      triggerShowModalConfirm({
        title: 'Confirm modal title',
        content: <>Confirm modal content</>,
      });
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render a info Modal', () => {
    const { baseElement } = setup();

    act(() => {
      triggerShowModalInfo({
        title: 'Info modal title',
        content: <>Info modal content</>,
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
        content: <>Accept modal content</>,
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
    expect(debounce).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      MODAL_TIMEOUT_TO_OPEN
    );
    expect(debounce).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      MODAL_TIMEOUT_TO_CLOSE
    );
  });
});
