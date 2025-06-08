import type { Meta, StoryObj } from "@storybook/react";
import { HeaderMenu } from "./header-menu";

const meta: Meta<typeof HeaderMenu> = {
  title: "Header/HeaderMenu",
  component: HeaderMenu,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof HeaderMenu>;

export const Default: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <HeaderMenu />
    </div>
  ),
};
