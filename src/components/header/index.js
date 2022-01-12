import { Link } from 'preact-router/match';

const navigation = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/' },
  { name: 'Docs', href: '/' },
  { name: 'Company', href: '/' }
];

export default function Example() {
  return (
    <header className="bg-emerald-600">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
        <top-nav className="flex items-center justify-between w-full py-6 border-b border-emerald-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">News You Missed 2021</span>
              <img className="w-auto h-10" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="" />
            </Link>
            <main-nav className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link key={link.name} href={link.href} className="text-base font-medium text-white hover:text-emerald-50">
                  {link.name}
                </Link>
              ))}
            </main-nav>
          </div>
          <top-buttons className="block ml-10 space-x-4">
            <a href="https://github.com/ekwoka/newsreflection" className="inline-block px-4 py-2 text-base font-medium text-white border border-transparent rounded-md bg-emerald-500 hover:bg-opacity-75">
              Sign in
            </a>
            <Link href="/" className="inline-block px-4 py-2 text-base font-medium bg-white border border-transparent rounded-md text-emerald-600 hover:bg-emerald-50">
              Sign up
            </Link>
          </top-buttons>
        </top-nav>
        <nav-bar className="flex flex-wrap justify-center py-4 space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link key={link.name} href={link.href} className="text-base font-medium text-white hover:text-emerald-50">
              {link.name}
            </Link>
          ))}
        </nav-bar>
      </nav>
    </header>
  );
}
