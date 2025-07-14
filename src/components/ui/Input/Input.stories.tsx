import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Search } from "lucide-react";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "UI/Input",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "Hello world",
    readOnly: true,
  },
};

export const WithIcons: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        startIcon={<Search size={16} />}
        endComponent={
          value ? (
            <button onClick={() => setValue("")}>
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4l8 8M12 4l-8 8"
                />
              </svg>
            </button>
          ) : null
        }
        placeholder="With start and end icons"
      />
    );
  },
};
