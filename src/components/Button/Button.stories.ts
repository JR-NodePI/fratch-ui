import type { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonSizes, ButtonTypes } from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "DEFAULT",
    type: ButtonTypes.PRIMARY,
    size: ButtonSizes.MEDIUM,
  },
};
