"use client";
import { MAX_BASE_STAT_VALUE } from '@/constants/consts';
import { PokemonStat } from '@/lib/definitions';
import { FC, useEffect, useState } from 'react';

interface PokemonStatBarProps {
  pokemonStat: PokemonStat,
  totalCells: number,
  className: string,
  key: string
}

const PokemonStatBar: FC<PokemonStatBarProps> = ({ pokemonStat, totalCells, className, key }) => {
  const [stat, setStat] = useState<PokemonStat | null>();
  const [filledCells, setFilledCells] = useState(0);

  function formatStatName(statName: string): string {
    return statName.toUpperCase().replace(/-/g, ' ');
  }

  useEffect(() => {
    setStat(pokemonStat);
  }, []);

  useEffect(() => {
    setFilledCells(Math.floor(((stat?.base_stat ?? 0) / MAX_BASE_STAT_VALUE) * totalCells));
  }, [stat]);

  return (
    stat &&
    <div key={key} className={className}>
      <ul className="flex flex-col-reverse items-center gap-1 mb-2 flex-wrap">
        {Array.from({ length: totalCells }, (_, index) => (
          <li
          key={index}
          className={`w-10 xl:w-16 md:w-14 sm:w-12 h-2 rounded-sm ${
            index < filledCells ? "bg-[#4d92d7]" : "bg-white"
          }`}
        />
        ))}
      </ul>
      <div className='flex justify-center items-center text-center text-xs text-white'>{formatStatName(stat.stat.name)}</div>
    </div>
  );
}

export default PokemonStatBar;