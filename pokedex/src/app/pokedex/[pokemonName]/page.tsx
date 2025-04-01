import PokemonEvolutionChain from "@/components/common/PokemonEvolutionChain";
import PokemonStatBar from "@/components/common/PokemonStatBar";
import { API_ENDPOINTS, createUrl, fetchData } from "@/constants/api";
import { Ability, FlavorTextEntry, Genera, Pokemon, PokemonSpecies, PokemonStat, PokemonType, Type } from "@/lib/definitions";
import clsx from "clsx";
import Image from "next/image";

interface PokemonDetailsPageProps {
  params: {
    pokemonName: string;
  };
}

export default async function PokemonDetailsPage({ params }: PokemonDetailsPageProps) {
  const { pokemonName } = params;

  function formatNumberToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
  }


  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function decimetersToMeters(dm: number) {
    const meters = dm * 0.1;
    return Math.round(meters * 100) / 100;
  }

  function hectogramsToKilograms(hg: number) {
    const kilograms = hg * 0.1;
    return kilograms;
  }

  const pokemonUrl:string = `${createUrl(API_ENDPOINTS.POKEMON)}/${pokemonName}`;
  const pokemon: Pokemon = await fetchData(pokemonUrl);

  const pokemonSpeciesUrl: string = `${createUrl(API_ENDPOINTS.POKEMON_SPECIES)}/${pokemon.id}`;
  const pokemonSpecies: PokemonSpecies = await fetchData(pokemonSpeciesUrl);

  const pokemonWeaknesses: Type[] = await Promise.all(
    pokemon.types.map(async (pokemonType: PokemonType) => {
      const type: Type = await fetchData(pokemonType.type.url);
      return type.damage_relations.double_damage_from;
    })
  ).then(results => results.flat());

  const uniqueWeaknesses: Type[] = Array.from(
    new Map(pokemonWeaknesses.map(w => [w.name, w])).values()
  );

  return (
    <div className="flex items-center justify-start h-full w-full">
      {pokemon 
      ?  <div className="flex flex-col items-center justify-start h-full w-full">

          {/* Title Section */}
          <div className="pokemon-title text-center text-4xl p-4 text-gray-800">
            {capitalizeFirstLetter(pokemon.name)} <span className="text-gray-400">#{formatNumberToFourDigits(pokemon.id)}</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-4 pb-4">
            <div className="flex flex-col w-full lg:w-1/2 gap-4">

              {/* Image Section */}
              <div className="pokemon-image bg-gray-200 rounded-t-md w-full flex flex-col justify-center items-center">
                <Image src={`/images/sprites/pokemon/${pokemon.id}.png`} 
                      width={475} height={475} alt={`Pokemon: ${pokemon.name}`} />
              </div>

              {/* Stats Section */}
              <div className="pokemon-stats border-2 border-gray-400 bg-gray-400 rounded-md p-4">
                <div className="pokemon-stats-label text-white text-md mb-4">Stats</div>
                <ul className="pokemon-stats-list flex justify-between flex-wrap">
                  {pokemon.stats.map((pokemonStat: PokemonStat) => (
                    <PokemonStatBar key={pokemonStat.stat.name} totalCells={15} pokemonStat={pokemonStat} className="w-1/3 md:w-1/6 mb-4" />
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-1/2 pt-2">
            
              {/* Description Section */}
              {pokemonSpecies && <p className="pokemon-description text-xl text-gray-800 mb-4">
                {pokemonSpecies?.flavor_text_entries?.find((flavorTextEntry: FlavorTextEntry) => flavorTextEntry.language.name === 'en' && flavorTextEntry.version.name === 'shield')?.flavor_text}
              </p>}
              
              {/* Information Section */}
              <div className="pokemon-info flex flex-wrap border-gray-800 border-2 bg-gray-800 rounded-lg p-4 mb-4">
                <div className="pokemon-height flex flex-col w-1/2 mb-4">
                  <div className="pokemon-height-label text-yellow-400 text-md mb-1">Height:</div>
                  <div className="pokemon-height-value text-white text-xl">{decimetersToMeters(pokemon.height)} m</div>
                </div>
                <div className="pokemon-category flex flex-col w-1/2 mb-4">
                  <div className="pokemon-category-label text-yellow-400 text-md mb-1">Category:</div>
                  <div className="pokemon-category-value text-white text-xl">{pokemonSpecies?.genera?.find((genera: Genera) => genera.language.name === 'en')?.genus?.split(' ')[0]}</div>
                </div>
                <div className="pokemon-weight flex flex-col w-1/2 mb-4">
                  <div className="pokemon-weight-label text-yellow-400 text-md mb-1">Weight:</div>
                  <div className="pokemon-weight-value text-white text-xl">{hectogramsToKilograms(pokemon.weight)} kg</div>
                </div>
                <div className="pokemon-abilities flex flex-col w-1/2 mb-4">
                  <div className="pokemon-abilities-label text-yellow-400 text-md mb-1">Abilities:</div>
                  {pokemon.abilities.map((ability: Ability) => (
                    <div className="pokemon-abilities-value text-white text-xl" key={ability.ability.name}>{capitalizeFirstLetter(ability.ability.name)}</div>
                  ))}
                </div>
              </div>

              {/* Types Section */}
              <div className="pokemon-types mb-4">
                <div className="pokemon-types-label text-xl text-gray-800 mb-2">Type</div>
                <div className="pokemon-types-values flex flex-wrap gap-2">
                  {pokemon.types.map((type: PokemonType) => (
                    <div className={clsx("pokemon-type text-sm rounded-md px-4 py-1 w-fit min-w-12 md:min-w-24 lg:min-w-32 flex justify-center items-center", 
                    {
                      "bg-[#9199a3] text-white": type.type.name === "normal",
                      "bg-[#cf4169] text-white": type.type.name === "fighting",
                      "bg-[#8fa9dc] text-white": type.type.name === "flying",
                      "bg-[#a86bc8] text-white": type.type.name === "poison",
                      "bg-[#d87845] text-white": type.type.name === "ground",
                      "bg-[#c3b88a] text-white": type.type.name === "rock",
                      "bg-[#4d553e] text-white": type.type.name === "bug",
                      "bg-[#5269ad] text-white": type.type.name === "ghost",
                      "bg-[#588fa3] text-white": type.type.name === "steel",
                      "bg-[#ff9d54] text-white": type.type.name === "fire",
                      "bg-[#4d92d7] text-white": type.type.name === "water",
                      "bg-[#5fbe56] text-white": type.type.name === "grass",
                      "bg-[#f4d23b] text-white": type.type.name === "electric",
                      "bg-[#f67476] text-white": type.type.name === "psychic",
                      "bg-[#73cebf] text-white": type.type.name === "ice",
                      "bg-[#0b6dc4] text-white": type.type.name === "dragon",
                      "bg-[#5b5464] text-white": type.type.name === "dark",
                      "bg-[#ec90e7] text-white": type.type.name === "fairy",
                      "bg-[#485172] text-white": type.type.name === "stellar",
                      "bg-[#95c5b7] text-white": type.type.name === "unknown",
                    }
                    )} key={type.type.name}>{capitalizeFirstLetter(type.type.name)}</div>
                  ))}
                </div>
              </div>

              {/* Weaknesses Section */}
              <div className="pokemon-weaknesses mb-4">
              <div className="pokemon-weaknesses-label text-xl text-gray-800 mb-2">Weaknesses</div>
                <div className="pokemon-weaknesses-values flex flex-wrap gap-2">
                  {uniqueWeaknesses.map((weakness: Type) => (<div className={clsx("pokemon-type text-sm rounded-md px-4 py-1 w-fit min-w-12 md:min-w-24 lg:min-w-32 flex justify-center items-center", 
                    {
                      "bg-[#9199a3] text-white": weakness.name === "normal",
                      "bg-[#cf4169] text-white": weakness.name === "fighting",
                      "bg-[#8fa9dc] text-white": weakness.name === "flying",
                      "bg-[#a86bc8] text-white": weakness.name === "poison",
                      "bg-[#d87845] text-white": weakness.name === "ground",
                      "bg-[#c3b88a] text-white": weakness.name === "rock",
                      "bg-[#4d553e] text-white": weakness.name === "bug",
                      "bg-[#5269ad] text-white": weakness.name === "ghost",
                      "bg-[#588fa3] text-white": weakness.name === "steel",
                      "bg-[#ff9d54] text-white": weakness.name === "fire",
                      "bg-[#4d92d7] text-white": weakness.name === "water",
                      "bg-[#5fbe56] text-white": weakness.name === "grass",
                      "bg-[#f4d23b] text-white": weakness.name === "electric",
                      "bg-[#f67476] text-white": weakness.name === "psychic",
                      "bg-[#73cebf] text-white": weakness.name === "ice",
                      "bg-[#0b6dc4] text-white": weakness.name === "dragon",
                      "bg-[#5b5464] text-white": weakness.name === "dark",
                      "bg-[#ec90e7] text-white": weakness.name === "fairy",
                      "bg-[#485172] text-white": weakness.name === "stellar",
                      "bg-[#95c5b7] text-white": weakness.name === "unknown",
                    }
                    )} key={weakness.name}>{capitalizeFirstLetter(weakness.name)}</div>))
                  }
                </div>
              </div>


              {/* Evolution Section */}
              <div className="pokemon-evolution flex flex-col bg-gray-800 border-2 border-gray-800 rounded-md p-4">
                <div className="pokemon-evolution-label text-xl text-yellow-400 mb-2">Evolution</div>
                <PokemonEvolutionChain evolutionChainUrl={pokemonSpecies.evolution_chain.url} />
              </div>
            </div>
          </div>
        </div>
      : <></>}
    </div>
  );
}
