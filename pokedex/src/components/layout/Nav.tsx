import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-xl font-bold text-yellow-400 hover:text-yellow-200">
            <Link href="/">Pokedex</Link>
          </div>
          
          {/* Mobile menu (burger button) */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5 items-center">
              <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
          
          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8">
            <li>
              <Link href="/" className="text-yellow-400 hover:text-yellow-200 font-secondary text-xs">Home</Link>
            </li>
            <li>
              <Link href="/pokedex" className="text-yellow-400 hover:text-yellow-200 font-secondary text-xs">Pokedex</Link>
            </li>
            <li>
              <Link href="/about" className="text-yellow-400 hover:text-yellow-200 font-secondary text-xs">About Project</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {/*Mobile menu */}
      <div className={`fixed top-0 left-0 w-full h-full z-40 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        ></div>
        
        <div className={`absolute top-0 right-0 w-64 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="flex flex-col px-8 py-16 gap-6">
            <li>
              <Link 
                href="/" 
                className="text-yellow-400 hover:text-yellow-200 font-secondary text-sm block py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/pokedex" 
                className="text-yellow-400 hover:text-yellow-200 font-secondary text-sm block py-2"
                onClick={() => setIsOpen(false)}
              >
                Pokedex
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-yellow-400 hover:text-yellow-200 font-secondary text-sm block py-2"
                onClick={() => setIsOpen(false)}
              >
                About Project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}