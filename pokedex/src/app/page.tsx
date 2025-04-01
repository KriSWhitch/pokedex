import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen py-4">
      {/* Hero Section */}
      <div className="text-gray-800 py-12 px-4 text-center mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-yellow-400">Pokédex</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your ultimate digital Pokémon encyclopedia
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/pokedex" 
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Explore Pokédex
            </Link>
            <Link 
              href="/about" 
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 border border-white rounded-lg transition-colors"
            >
              About Project
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-16 px-4 bg-gray-100 mb-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Discover Pokémon Like Never Before
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-yellow-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Instant Search</h3>
            <p className="text-gray-600 text-center">
              Quickly find any Pokémon by name or number with our lightning-fast search
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-yellow-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Detailed Stats</h3>
            <p className="text-gray-600 text-center">
              View complete stats, abilities, and evolution chains for every Pokémon
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-yellow-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Type Advantages</h3>
            <p className="text-gray-600 text-center">
              Learn type matchups and weaknesses to build your perfect team
            </p>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-gray-800 text-white py-16 px-4 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Try It Now</h2>
          <p className="text-xl mb-8">
            Start exploring the world of Pokémon today
          </p>
          <Link 
            href="/pokedex" 
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Browse Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}