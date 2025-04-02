import Image from "next/image";
import PokemonEvolutionChain from "@/components/common/PokemonEvolutionChain";
import PokemonStatBar from "@/components/common/PokemonStatBar";
import { API_ENDPOINTS, createUrl, fetchData } from "@/constants/api";
import { FlavorTextEntry, Genera, Pokemon, PokemonSpecies, Type } from "@/lib/definitions";
import { PokemonTypeSection } from "@/components/common/PokemonTypeSection";
import { PokemonDetailItem } from "@/components/common/PokemonDetailItem";

type PokemonDetailsPageProps = {
  params: { pokemonName: string };
};

const formatPokemonId = (id: number) => id.toString().padStart(4, '0');
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const toMeters = (dm: number) => Math.round(dm * 0.1 * 100) / 100;
const toKilograms = (hg: number) => Math.round(hg * 0.1 * 100) / 100;

export default async function PokemonDetailsPage({ params }: PokemonDetailsPageProps) {
  const { pokemonName } = params;

  const pokemon: Pokemon = await fetchData(`${createUrl(API_ENDPOINTS.POKEMON)}/${pokemonName}`);
  const pokemonSpecies: PokemonSpecies = await fetchData(`${createUrl(API_ENDPOINTS.POKEMON_SPECIES)}/${pokemon.id}`);

  const weaknesses = await Promise.all(
    pokemon.types.map(async ({ type }) => {
      const typeData: Type = await fetchData(type.url);
      return typeData.damage_relations.double_damage_from;
    })
  ).then(results => Array.from(new Map(results.flat().map(w => [w.name, w])).values()));

  const englishDescription = pokemonSpecies?.flavor_text_entries
    ?.find((entry: FlavorTextEntry) => 
      entry.language.name === 'en' && 
      entry.version.name === 'shield'
    )?.flavor_text;

  const englishGenus = pokemonSpecies?.genera
    .find((genera: Genera) => genera.language.name === 'en')?.genus
    ?.split(' ')[0];

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col items-center w-full max-w-6xl">

        <div className="text-center text-4xl p-4 text-gray-800">
          {capitalize(pokemon.name)} <span className="text-gray-400">#{formatPokemonId(pokemon.id)}</span>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-6 pb-4">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="bg-gray-200 rounded-lg p-4 flex justify-center">
              <Image 
                src={`/images/sprites/pokemon/${pokemon.id}.png`}
                width={475}
                height={475}
                alt={pokemon.name}
                className="object-contain"
              />
            </div>

            <div className="bg-gray-400 border-2 border-gray-400 rounded-lg p-4">
              <h2 className="text-white text-lg mb-4">Stats</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                {pokemon.stats.map((stat) => (
                  <PokemonStatBar 
                    key={stat.stat.name}
                    totalCells={15}
                    pokemonStat={stat}
                    className="mb-4"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4 pt-2">
            {englishDescription && (
              <p className="text-gray-800 text-lg mb-4">
                {englishDescription}
              </p>
            )}

            <div className="bg-gray-800 border-2 border-gray-800 rounded-lg p-4 grid grid-cols-2 gap-4">
              <PokemonDetailItem label="Height" value={`${toMeters(pokemon.height)} m`} />
              <PokemonDetailItem label="Category" value={englishGenus} />
              <PokemonDetailItem label="Weight" value={`${toKilograms(pokemon.weight)} kg`} />
              <PokemonDetailItem label="Abilities" value={pokemon.abilities.map(a => capitalize(a.ability.name)).join(', ')}/>
            </div>

            <PokemonTypeSection title="Type" types={pokemon.types.map(t => t.type.name)} />
            <PokemonTypeSection title="Weaknesses" types={weaknesses.map(w => w.name)} />

            {pokemonSpecies?.evolution_chain?.url && (
              <div className="bg-gray-800 border-2 border-gray-800 rounded-lg p-4">
                <h2 className="text-yellow-400 text-xl mb-4">Evolution</h2>
                <PokemonEvolutionChain evolutionChainUrl={pokemonSpecies.evolution_chain.url} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}