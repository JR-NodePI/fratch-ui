import { ButtonSizes, ButtonTypes } from "./ButtonProps";
import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

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
