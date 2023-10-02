import type { Meta, StoryObj } from '@storybook/react';

import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Components/Modal',
  component: StoryRenderer,
  argTypes: {
    onAcceptOpen: { action: 'onAcceptOpen', table: { disable: true } },
    onAcceptClose: { action: 'onAcceptClose', table: { disable: true } },
    onConfirmOpen: { action: 'onConfirmOpen', table: { disable: true } },
    onConfirmClose: { action: 'onConfirmClose', table: { disable: true } },
    onInfoOpen: { action: 'onInfoOpen', table: { disable: true } },
    onInfoClose: { action: 'onInfoClose', table: { disable: true } },
  },
} satisfies Meta<typeof StoryRenderer>;

export default meta;

type Story = StoryObj<typeof StoryRenderer>;

export const _Modal: Story = {
  args: {
    acceptButtonLabel: 'Custom accept label',
    cancelButtonLabel: 'Custom cancel label',
  },
};
