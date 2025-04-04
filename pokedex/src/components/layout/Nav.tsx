"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pokedex', label: 'Pokedex' },
    { href: '/about', label: 'About Project' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link 
            href="/" 
            className="text-xl font-bold text-yellow-400 hover:text-yellow-200 transition-colors"
          >
            Pokedex
          </Link>
          
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5 items-center">
              <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
          
          <ul className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-yellow-400 hover:text-yellow-200 font-secondary text-xs transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black transition-opacity ${isOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={closeMenu}
        />
        
        <div className={`absolute top-0 right-0 w-64 h-full bg-gray-800 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="flex flex-col px-8 py-16 gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-yellow-400 hover:text-yellow-200 font-secondary text-sm block py-2 transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}