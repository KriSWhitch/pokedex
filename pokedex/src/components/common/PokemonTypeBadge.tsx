import { BadgeSize, PokemonTypeName } from '@/lib/enums';
import clsx from 'clsx';

type PokemonTypeBadgeProps = {
  type: PokemonTypeName;
  size?: BadgeSize;
  className?: string;
  children?: React.ReactNode;
};

const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: 'bg-[#9199a3]',
  fighting: 'bg-[#cf4169]',
  flying: 'bg-[#8fa9dc]',
  poison: 'bg-[#a86bc8]',
  ground: 'bg-[#d87845]',
  rock: 'bg-[#c3b88a]',
  bug: 'bg-[#4d553e]',
  ghost: 'bg-[#5269ad]',
  steel: 'bg-[#588fa3]',
  fire: 'bg-[#ff9d54]',
  water: 'bg-[#4d92d7]',
  grass: 'bg-[#5fbe56]',
  electric: 'bg-[#f4d23b]',
  psychic: 'bg-[#f67476]',
  ice: 'bg-[#73cebf]',
  dragon: 'bg-[#0b6dc4]',
  dark: 'bg-[#5b5464]',
  fairy: 'bg-[#ec90e7]',
  stellar: 'bg-[#485172]',
  unknown: 'bg-[#95c5b7]'
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5 min-w-10',
  md: 'text-sm px-3 py-1 min-w-12',
  lg: 'text-base px-4 py-1.5 min-w-16'
};

const formatTypeName = (type: string) => type.charAt(0).toUpperCase() + type.slice(1);

export const PokemonTypeBadge = ({ 
  type, 
  size = 'md', 
  className = '',
  children 
}: PokemonTypeBadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center justify-center rounded-md font-medium text-white',
      TYPE_COLORS[type] ?? 'bg-gray-500',
      SIZE_CLASSES[size],
      className
    )}
    aria-label={`${type} type`}
    title={formatTypeName(type)}
  >
    {children ?? formatTypeName(type)}
  </span>
);