import PokemonEvolutionChain from "@/components/common/PokemonEvolutionChain";
import PokemonStatBar from "@/components/common/PokemonStatBar";
import { PokemonTypeBadge } from "@/components/common/PokemonTypeBadge";
import { API_ENDPOINTS, createUrl, fetchData } from "@/constants/api";
import { Ability, FlavorTextEntry, Genera, Pokemon, PokemonSpecies, PokemonStat, PokemonType, Type } from "@/lib/definitions";
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
    return Math.round(kilograms * 100) / 100;
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
                    <PokemonTypeBadge 
                      key={type.type.name} 
                      type={type.type.name}
                      size="lg"
                    />
                  ))}
                </div>
              </div>

              {/* Weaknesses Section */}
              <div className="pokemon-weaknesses mb-4">
              <div className="pokemon-weaknesses-label text-xl text-gray-800 mb-2">Weaknesses</div>
                <div className="pokemon-weaknesses-values flex flex-wrap gap-2">
                  {uniqueWeaknesses.map((weakness: Type) => (
                    <PokemonTypeBadge 
                      key={weakness.name} 
                      type={weakness.name}
                      size="lg"
                    />))
                  }
                </div>
              </div>


              {/* Evolution Section */}
              {pokemonSpecies?.evolution_chain?.url && <div className="pokemon-evolution flex flex-col bg-gray-800 border-2 border-gray-800 rounded-md p-4">
                <div className="pokemon-evolution-label text-xl text-yellow-400 mb-4">Evolution</div>
                <PokemonEvolutionChain evolutionChainUrl={pokemonSpecies.evolution_chain.url} />
              </div>}
            </div>
          </div>
        </div>
      : <></>}
    </div>
  );
}
