import { Link } from 'preact-router/match';

const NAVIGATION = [
  { name: 'Map', href: '/map' },
  { name: 'Random', href: '/random' },
  { name: 'Table', href: '/table' },
  { name: 'Favorites', href: '/favorites' },
  { name: 'Search', func: 'openSearch' }
];

export default function Header() {
  return (
    <header className="bg-emerald-700">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
        <top-nav className="flex items-center justify-between w-full py-6 border-b border-emerald-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">News You Missed 2021</span>
              <h1 className="text-xl font-semibold tracking-wide text-emerald-50">News You Missed 2021</h1>
            </Link>
            <main-nav className="hidden ml-10 space-x-8 lg:block">
              {NAVIGATION.map((link) => (
                <Link key={link.name} href={link.href} className="text-base font-medium text-emerald-50 hover:text-white">
                  {link.name}
                </Link>
              ))}
            </main-nav>
          </div>
        </top-nav>
        <nav-bar className="flex flex-wrap justify-center py-4 space-x-6 lg:hidden">
          {NAVIGATION.map((link) => (
            <Link key={link.name} href={link.href} className="text-base font-medium text-emerald-50 hover:text-white">
              {link.name}
            </Link>
          ))}
        </nav-bar>
      </nav>
    </header>
  );
}
