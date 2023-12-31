import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LeftLabeledField from './LeftLabeledField';
import { type LeftLabeledFieldProps } from './LeftLabeledFieldProps';

describe('LeftLabeledField', () => {
  const initialProps: LeftLabeledFieldProps = {
    field: <input type="text" />,
    label: <label>mock-label</label>,
  };

  const setup = (
    props: LeftLabeledFieldProps = initialProps
  ): ReturnType<typeof render> => render(<LeftLabeledField {...props} />);

  it('should render properly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should render with className', () => {
    const { container } = setup({
      ...initialProps,
      className: 'mock-class',
    });
    expect(container).toMatchSnapshot();
  });
});
