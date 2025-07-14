import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/ProgressBar",
  component: Progress,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => <Progress value={50} />,
};

export const Zero: Story = {
  render: () => <Progress value={0} />,
};

export const Full: Story = {
  render: () => <Progress value={100} />,
};

export const Animated: Story = {
  render: () => {
    const [value, setValue] = React.useState(10);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 10));
      }, 700);
      return () => clearInterval(interval);
    }, []);
    return <Progress value={value} />;
  },
};

export const CustomColor: Story = {
  render: () => (
    <Progress
      value={60}
      indicatorClassName="bg-green-500"
      className="!bg-gray-200"
    >
      <div
        className="bg-green-500 h-full transition-all"
        style={{ width: "60%" }}
        data-slot="progress-indicator"
      />
    </Progress>
  ),
};

export const AnimatedRed: Story = {
  render: () => {
    const [value, setValue] = React.useState(10);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 10));
      }, 700);
      return () => clearInterval(interval);
    }, []);
    return (
      <Progress
        value={value}
        indicatorClassName="bg-red-500"
        className="!bg-gray-200"
      />
    );
  },
};

export const AnimatedBlueReverse: Story = {
  render: () => {
    const [value, setValue] = React.useState(100);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v <= 0 ? 100 : v - 10));
      }, 700);
      return () => clearInterval(interval);
    }, []);
    return (
      <Progress
        value={value}
        indicatorClassName="bg-blue-500"
        className="!bg-gray-200"
      />
    );
  },
};
