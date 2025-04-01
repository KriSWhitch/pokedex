import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-3xl flex flex-col items-start justify-start h-full w-full py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-2">
        About Pokédex Project
      </h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Project Overview</h2>
          <p className="text-gray-700">
            A functional Pokédex with detailed Pokémon information including stats, types, and weaknesses. 
            The project uses the official Pokémon API to fetch up-to-date data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Tailwind CSS',
              'PokéAPI',
              'Axios'
            ].map(tech => (
              <span 
                key={tech}
                className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Key Features</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Detailed Pokémon profiles</li>
            <li>Type and weakness visualization</li>
            <li>Responsive UI</li>
            <li>Fast search functionality</li>
            <li>Performance optimizations</li>
          </ul>
        </div>

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