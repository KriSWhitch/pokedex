import { API_ENDPOINTS, createUrl } from "@/constants/api";
import { FlavorTextEntry, Pokemon, PokemonSpicies } from "@/lib/definitions";
import Image from "next/image";

interface PokemonDetailsPageProps {
  params: {
    pokemonName: string;
  };
}

export default async function PokemonDetailsPage({ params }: PokemonDetailsPageProps) {
  const { pokemonName } = params;
  const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
  
      return data;
    } else {
      return null;
    }
  }

  function formatNumberToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
  }


  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const pokemon: Pokemon = await fetchData(`${createUrl(API_ENDPOINTS.POKEMON)}/${pokemonName}`);
  const pokemonSpicies: PokemonSpicies = await fetchData(`${createUrl(API_ENDPOINTS.POKEMON_SPICIES)}/${pokemon.id}`);

  return (
    <div className="flex flex-col items-center justify-start h-full w-full">
      {pokemon 
      ?  <div className="flex flex-col items-center justify-start h-full w-full">
          <div className="pokemon-title text-center text-4xl p-4">
            {capitalizeFirstLetter(pokemon.name)} <span className="text-gray-400">#{formatNumberToFourDigits(pokemon.id)}</span>
          </div>
          <div className="flex justify-between w-full gap-4">
            <div className="flex flex-col w-full md:w-1/2">
              <div className="pokemon-image bg-gray-200 rounded-t-md w-full flex flex-col justify-center items-center">
                <Image src={`/images/sprites/pokemon/${pokemon.id}.png`} 
                      width={475} height={475} alt={`Pokemon: ${pokemon.name}`} />
              </div>
              <div className="pokemon-stats">

              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 pt-2">
              {pokemonSpicies && <p className="pokemon-description text-xl">
                {pokemonSpicies?.flavor_text_entries?.find((flavorTextEntry: FlavorTextEntry) => flavorTextEntry.language.name === 'en' && flavorTextEntry.version.name === 'shield')?.flavor_text}
              </p>}
              <div className="pokemon-attributes">

              </div>
              <div className="pokemon-types">

              </div>
              <div className="pokemon-weaknesses"></div>
            </div>
          </div>
        </div>
      : <></>}
    </div>
  );
}
