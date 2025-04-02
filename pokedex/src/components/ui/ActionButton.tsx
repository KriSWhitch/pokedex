import Link from "next/link";

export const ActionButton = ({ href, children, variant }: { 
  href: string, 
  children: React.ReactNode, 
  variant: 'primary' | 'secondary' 
}) => (
  <Link
    href={href}
    className={`font-bold py-3 px-6 rounded-lg transition-colors ${
      variant === 'primary' 
        ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-800' 
        : 'bg-gray-800 hover:bg-gray-700 text-white border border-white'
    }`}
  >
    {children}
  </Link>
);