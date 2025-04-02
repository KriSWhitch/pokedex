import { Section } from '@/components/ui/Section';
import { TechTag } from '@/components/ui/TechTag';
import Link from 'next/link';

const technologies = [
  'Next.js 15',
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'PokéAPI',
  'Axios'
];

const features = [
  'Detailed Pokémon profiles',
  'Type and weakness visualization',
  'Responsive UI',
  'Fast search functionality',
  'Performance optimizations'
];

export default function About() {
  return (
    <div className="max-w-3xl flex flex-col items-start justify-start h-full w-full py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-2">
        About Pokédex Project
      </h1>
      
      <div className="space-y-6">
        <Section title="Project Overview">
          <p className="text-gray-700">
            A functional Pokédex with detailed Pokémon information including stats, types, and weaknesses. 
            The project uses the official Pokémon API to fetch up-to-date data.
          </p>
        </Section>

        <Section title="Technologies Used">
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <TechTag key={tech} tech={tech} />
            ))}
          </div>
        </Section>

        <Section title="Key Features">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Section>

        <div className="pt-4">
          <Link 
            href="/pokedex" 
            className="inline-block bg-gray-800 hover:bg-gray-700 text-yellow-400 hover:text-yellow-300 px-4 py-2 rounded transition-colors"
          >
            Back to Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}