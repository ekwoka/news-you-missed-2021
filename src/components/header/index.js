import { Link } from 'preact-router/match';

const NAVIGATION = [
  { name: 'Map', href: '/map' },
  { name: 'Random', href: '/random' },
  { name: 'Table', href: '/articles' },
  { name: 'Favorites', href: '/favorites' },
  { name: 'Search', func: 'openSearch' },
];

export default function Header() {
  return (
    <header className="bg-emerald-700">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <top-nav className="flex w-full items-center justify-between border-b border-emerald-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">News You Missed 2021</span>
              <h1 className="text-xl font-semibold tracking-wide text-emerald-50">
                News You Missed 2021
              </h1>
            </Link>
            <main-nav className="ml-10 hidden space-x-8 lg:block">
              {NAVIGATION.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-emerald-50 hover:text-white">
                  {link.name}
                </Link>
              ))}
            </main-nav>
          </div>
        </top-nav>
        <nav-bar className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {NAVIGATION.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-emerald-50 hover:text-white">
              {link.name}
            </Link>
          ))}
        </nav-bar>
      </nav>
    </header>
  );
}
