import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  title: "Header/Header",
  component: Header,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => (
    <div className="bg-gray-50 min-h-[100px]">
      <Header />
    </div>
  ),
};