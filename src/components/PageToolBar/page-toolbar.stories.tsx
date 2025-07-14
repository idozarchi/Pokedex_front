import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageToolbar } from "./page-toolbar";

const meta: Meta<typeof PageToolbar> = {
  title: "PageToolBar/PageToolbar",
  component: PageToolbar,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PageToolbar>;

export const Default: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");
    const [filter, setFilter] = React.useState<string | null>(null);

    return (
      <div className="p-8 bg-white">
        <PageToolbar
          title="All Pokemon"
          searchValue={search}
          onSearchChange={setSearch}
          filterOptions={[
            { label: "Name", value: "name" },
            { label: "XP", value: "xp" },
            { label: "Speed", value: "speed" },
          ]}
          filterValue={filter}
          onFilterChange={setFilter}
          filterLabel="Sort by"
        />
      </div>
    );
  },
};
