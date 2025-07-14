import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";
import { useState, useEffect } from "react";
import { fetchPokemons } from "../../../api/fetchPokemons";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Table>;

type PokemonWithTypeXP = {
  id: number;
  name: {
    english: string;
    [key: string]: string;
  };
  type: string[];
  xp?: number;
};

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pokemons, setPokemons] = useState<PokemonWithTypeXP[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      fetchPokemons(100).then((data) => {
        const withXP = data.results.map((p: any, i: number) => ({
          ...p,
          xp: 50 + ((i * 7) % 100),
        }));
        setPokemons(withXP);
        setLoading(false);
      });
    }, []);

    const total = pokemons.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pagePokemons = pokemons.slice(start, end);

    return (
      <div className="p-8 bg-white">
        <Table>
          <TableCaption>A list of Pokémon and their types.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : (
              pagePokemons.map((pokemon) => (
                <TableRow key={pokemon.id}>
                  <TableCell>{pokemon.id}</TableCell>
                  <TableCell>{pokemon.name?.english ?? ""}</TableCell>
                  <TableCell>
                    {Array.isArray(pokemon.type) ? pokemon.type.join(", ") : ""}
                  </TableCell>
                  <TableCell>{pokemon.xp}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </Table>
      </div>
    );
  },
};
