import type { Meta, StoryObj } from "@storybook/react";
import { HeaderLogo } from "./header-logo";

const meta: Meta<typeof HeaderLogo> = {
  title: "Header/HeaderLogo",
  component: HeaderLogo,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof HeaderLogo>;

export const Default: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <HeaderLogo />
    </div>
  ),
};
