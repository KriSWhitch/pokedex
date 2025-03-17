"use client";
import { Pokemon, PokemonReference } from "@/lib/definitions";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export interface PokemonCardProps {
  pokemonReference: PokemonReference
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemonReference }) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonFormatedId, setPokemonFormatedId] = useState<string>("");

  const fetchPokemon = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data);
  }

  function formatNumberToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    fetchPokemon(pokemonReference.url);
  }, []);

  useEffect(() => {
    if (pokemon) {
      setPokemonFormatedId(formatNumberToFourDigits(pokemon.id));
    }
  }, [pokemon]);

  return (
    pokemon 
    ? <li key={pokemon.name} className="pokemon-card__container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col justify-center items-center p-4">
        <div className="pokemon-card border-gray-700 border-2 border-r-4 shadow-lg rounded-lg w-full h-full flex flex-col justify-start items-center">
          <a className="w-full flex flex-col justify-center items-center" href={`/pokedex/${pokemon.name}`}>
            <div className="pokemon-image bg-gray-100 rounded-t-md w-full flex flex-col justify-center items-center">
              <Image src={`/images/sprites/pokemon/${pokemon.id}.png`} 
                     width={475} height={475} alt={`Pokemon: ${pokemon.name}`} />
            </div>
          </a>
          <div className="pokemon-info flex flex-col justify-center items-center p-2 pb-4">
            <p className="pokemon-id text-gray-400 text-xs mb-1">#{pokemonFormatedId}</p>
            <div className="pokemon-name text-2xl break-all mb-2">{capitalizeFirstLetter(pokemon.name)}</div>
            <ul className="pokemon-types flex gap-2 flex-wrap justify-center items-center">
              {pokemon.types.map((type) => {
                return (<li key={type.type.name} 
                            className={clsx("pokemon-type text-sm rounded-md px-4 py-1 min-w-12 flex justify-center items-center", 
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
                )}>
                  {capitalizeFirstLetter(type.type.name)}
                </li>)
              })}
            </ul>

          </div>
        </div>
    </li>
    : <></>
  );
}

export default PokemonCard;