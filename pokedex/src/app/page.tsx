import SearchIcon from '@/components/graphics/SearchIcon';
import { StatsIcon } from '@/components/graphics/StatsIcon';
import { TypeIcon } from '@/components/graphics/TypeIcon';
import { ActionButton } from '@/components/ui/ActionButton';
import { FeatureCard } from '@/components/ui/FeatureCard';

export default function Home() {
  const features = [
    {
      icon: <SearchIcon size='xl' center={true} />,
      title: "Instant Search",
      description: "Quickly find any Pokémon by name or number with our lightning-fast search"
    },
    {
      icon: <StatsIcon />,
      title: "Detailed Stats",
      description: "View complete stats, abilities, and evolution chains for every Pokémon"
    },
    {
      icon: <TypeIcon />,
      title: "Type Advantages",
      description: "Learn type matchups and weaknesses to build your perfect team"
    }
  ];

  return (
    <div className="min-h-screen py-4">
      <section className="text-gray-800 py-12 px-4 text-center mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-yellow-400">Pokédex</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your ultimate digital Pokémon encyclopedia
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ActionButton href="/pokedex" variant="primary">
              Explore Pokédex
            </ActionButton>
            <ActionButton href="/about" variant="secondary">
              About Project
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-100 mb-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Discover Pokémon Like Never Before
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <section className="bg-gray-800 text-white py-16 px-4 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Try It Now</h2>
          <p className="text-xl mb-8">
            Start exploring the world of Pokémon today
          </p>
          <div className="max-w-md mx-auto">
            <ActionButton href="/pokedex" variant="primary">
              Browse Pokédex
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
}