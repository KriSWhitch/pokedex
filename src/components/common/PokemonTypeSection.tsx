import { PokemonTypeName } from "@/lib/enums";
import { PokemonTypeBadge } from "./PokemonTypeBadge";

type PokemonTypeSectionProps = {
  title: string;
  types: PokemonTypeName[];
};

export const PokemonTypeSection = ({ title, types }: PokemonTypeSectionProps) => (
  <div className="mb-4">
    <h2 className="text-gray-800 text-xl mb-2">{title}</h2>
    <div className="flex flex-wrap gap-2">
      {types.map(type => (
        <PokemonTypeBadge key={type} type={type} size="lg" />
      ))}
    </div>
  </div>
);