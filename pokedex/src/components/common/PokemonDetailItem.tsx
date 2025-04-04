type PokemonDetailItemProps = {
  label: string;
  value?: string;
};

export const PokemonDetailItem = ({ label, value }: PokemonDetailItemProps) => (
  <div className="flex flex-col">
    <span className="text-yellow-400 text-md mb-1">{label}:</span>
    <span className="text-white text-lg">{value || '-'}</span>
  </div>
);