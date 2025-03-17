import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold text-yellow-400">
          <Link href="/">Pokedex</Link>
        </div>
        <ul className="flex gap-8">
          <li>
            <Link href="/" className="hover:text-yellow-400 font-secondary text-xs">Home</Link>
          </li>
          <li>
            <Link href="/pokedex" className="hover:text-yellow-400 font-secondary text-xs">Pokedex</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-400 font-secondary text-xs">About Project</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}