import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account tab content</TabsContent>
      <TabsContent value="password">Password tab content</TabsContent>
    </Tabs>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList divider>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account tab content</TabsContent>
      <TabsContent value="password">Password tab content</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" direction="col" className="h-[200px]">
      <TabsList direction="col" spacing="gap-4">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account tab content</TabsContent>
      <TabsContent value="password">Password tab content</TabsContent>
    </Tabs>
  ),
};

export const CustomSpacing: Story = {
  render: () => (
    <Tabs defaultValue="account" spacing="gap-8" className="w-[400px]">
      <TabsList spacing="gap-8">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account tab content</TabsContent>
      <TabsContent value="password">Password tab content</TabsContent>
      <TabsContent value="profile">Profile tab content</TabsContent>
    </Tabs>
  ),
};
