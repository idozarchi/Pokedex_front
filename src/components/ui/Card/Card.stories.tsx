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
import { Button } from "../Button/button";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "UI/Card",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardAction>
          <Button size="sm" variant="secondary">
            Action
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>
          This is the card content. You can place any React node here, including
          text, images, or other components.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <span>Card Footer</span>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Pokémon Card</CardTitle>
        <CardAction>
          <Button size="sm">Catch</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          style={{ width: 80, height: 80, marginBottom: 8 }}
        />
        <CardDescription>
          Pikachu is an Electric-type Pokémon introduced in Generation I.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          More Info
        </Button>
      </CardFooter>
    </Card>
  ),
};
