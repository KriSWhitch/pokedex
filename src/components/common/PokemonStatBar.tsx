"use client";
import { MAX_BASE_STAT_VALUE } from '@/constants/consts';
import { PokemonStat } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type PokemonStatBarProps = {
  pokemonStat: PokemonStat;
  totalCells: number;
  className?: string;
};

export default function PokemonStatBar({
  pokemonStat,
  totalCells,
  className = ""
}: PokemonStatBarProps) {
  const [filledCells, setFilledCells] = useState(0);

  const formatStatName = (name: string) => name.toUpperCase().replace(/-/g, ' ');

  useEffect(() => {
    const calculatedCells = Math.floor(
      (pokemonStat.base_stat / MAX_BASE_STAT_VALUE) * totalCells
    );

    setFilledCells(calculatedCells);
  }, [pokemonStat, totalCells]);

  return (
    <div className={className}>
      <ul className="flex flex-col-reverse items-center gap-1 mb-2">
        {Array.from({ length: totalCells }).map((_, index) => (
          <li
            key={index}
            className={clsx(
              "w-10 sm:w-12 md:w-14 xl:w-16 h-2 rounded-sm",
              index < filledCells ? "bg-[#4d92d7]" : "bg-white"
            )}
          />
        ))}
      </ul>
      <div className="text-center text-xs text-white">
        {formatStatName(pokemonStat.stat.name)}
      </div>
    </div>
  );
}