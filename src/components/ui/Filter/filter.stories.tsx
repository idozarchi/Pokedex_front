import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Filter } from "./filter";

const meta: Meta<typeof Filter> = {
  title: "UI/Filter",
  component: Filter,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="p-8">
        <Filter
          label="Filter type"
          options={[
            { label: "All", value: "all" },
            { label: "Fire", value: "fire" },
            { label: "Water", value: "water" },
            { label: "Grass", value: "grass" },
            { label: "Filter type", value: "Filter type" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Preselected: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("fire");
    return (
      <div className="p-8">
        <Filter
          label="Filter type"
          options={[
            { label: "All", value: "all" },
            { label: "Fire", value: "fire" },
            { label: "Water", value: "water" },
            { label: "Grass", value: "grass" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-8">
      <Filter
        label="Filter type"
        options={[
          { label: "All", value: "all" },
          { label: "Fire", value: "fire" },
          { label: "Water", value: "water" },
          { label: "Grass", value: "grass" },
        ]}
        value={null}
        onChange={() => {}}
      />
    </div>
  ),
};

export const CustomLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="p-8">
        <Filter
          label="Pokémon Type"
          options={[
            { label: "All", value: "all" },
            { label: "Electric", value: "electric" },
            { label: "Psychic", value: "psychic" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
