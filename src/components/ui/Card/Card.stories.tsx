import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "UI/Card",
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardAction>Action</CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>This is the card content.</CardDescription>
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  ),
};
