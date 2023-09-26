import { useContext } from 'react';

import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import MockComponent from '../../../__mocks__/MockComponent';
import ToasterListContext from '../ToasterListContext';
import { Toaster, ToasterItemProps } from '../ToasterProps';
import ToasterProvider from '../ToasterProvider';

let triggerCloseToaster: (toasterId: string) => void;
vi.mock('../ToasterItem', () => ({
  default: ({ onClose, ...props }: ToasterItemProps): JSX.Element => {
    triggerCloseToaster = onClose;
    return <MockComponent __testDisplayName="ToasterItem" {...props} />;
  },
}));

describe('ToasterProvider', () => {
  const onClose = vi.fn();
  const initialToaster: Toaster = { type: 'info', duration: 100 };
  const initialProps = {
    onClose,
    toaster: initialToaster,
    itemClassName: 'mock-item-class',
  };
  let triggerAddToaster: (toasters: Toaster) => void;

  const MockContent = (): JSX.Element => {
    const { toasters, addToaster } = useContext(ToasterListContext);
    triggerAddToaster = addToaster;
    return <p>{`Toaster counters: ${toasters?.length}`}</p>;
  };

  const setup = (
    props: ToasterItemProps = initialProps
  ): ReturnType<typeof render> =>
    render(
      <ToasterProvider {...props}>
        <MockContent />
      </ToasterProvider>
    );

  let randomUUIDCounter = 0;
  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockImplementation(() => {
      randomUUIDCounter++;
      return `crypto-mock-random-UUID-${randomUUIDCounter}`;
    });
  });

  afterEach(() => {
    randomUUIDCounter = 0;
    vi.restoreAllMocks();
    onClose.mockClear();
  });

  it('should render properly', () => {
    const { baseElement } = setup();
    expect(baseElement).toMatchSnapshot();
  });

  it('should add toasters', () => {
    const { baseElement } = setup();

    act(() => {
      triggerAddToaster({ ...initialToaster, type: 'info' });
      triggerAddToaster({ ...initialToaster, type: 'success' });
      triggerAddToaster({ ...initialToaster, type: 'error' });
      triggerAddToaster({ ...initialToaster, type: 'warning' });
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should close a toaster', () => {
    const { baseElement } = setup();

    act(() => {
      triggerAddToaster({ ...initialToaster, type: 'info' });
    });

    expect(baseElement).toMatchSnapshot('with initial toaster');

    act(() => {
      triggerCloseToaster('crypto-mock-random-UUID-2');
    });

    expect(baseElement).toMatchSnapshot('with deleted toaster');
  });
});
