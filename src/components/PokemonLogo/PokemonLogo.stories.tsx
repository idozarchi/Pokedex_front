import type { Meta, StoryObj } from "@storybook/react";
import { PokemonLogo } from "./PokemonLogo";

const meta: Meta<typeof PokemonLogo> = {
  title: "UI/PokemonLogo",
  component: PokemonLogo,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PokemonLogo>;

const charizardImg =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png";

export const Default: Story = {
  render: () => <PokemonLogo imgSrc={charizardImg} />,
};

export const Large: Story = {
  render: () => <PokemonLogo size={96} imgSrc={charizardImg} />,
};

export const Small: Story = {
  render: () => <PokemonLogo size={24} imgSrc={charizardImg} />,
};

export const WithCustomProps: Story = {
  render: () => (
    <PokemonLogo
      size={64}
      imgSrc={charizardImg}
      style={{ background: "#eee", borderRadius: 8 }}
    />
  ),
};

export const CharizardImage: Story = {
  render: () => (
    <PokemonLogo
      size={64}
      imgSrc={charizardImg}
      style={{ background: "#fff", borderRadius: 8 }}
    />
  ),
};
