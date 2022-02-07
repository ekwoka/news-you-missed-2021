import { Link } from 'preact-router/match';

const navOptions = [
  { name: 'Map', href: '/map' },
  { name: 'Random', href: '/random' },
  { name: 'Table', href: '/table' },
  { name: 'Favorites', href: '/favorites' },
  { name: 'Search', func: 'openSearch' },
];

export default function Hero() {
  return (
    <div className="bg-emerald-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full" aria-hidden="true">
          <div className="relative h-full">
            <svg
              className="absolute transform right-full translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784">
              <defs>
                <pattern
                  id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse">
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-emerald-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
              />
            </svg>
            <svg
              className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784">
              <defs>
                <pattern
                  id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse">
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-emerald-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
              />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <div className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">The News You Missed</span>
                <span className="block text-emerald-600">2021</span>
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                2021 was a wild year, well, for what little of it we were let
                out of the house. From Insurrections and Riots, to a Spiderman
                Reunion and the loss of Betty White. But we're here to highlight
                news from around the world that passed in the shadows.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="flex-1 w-full bg-emerald-900" />
          </div>
          <div className="px-4 mx-auto max-w-7xl sm:px-6">
            <img
              className="relative rounded-lg shadow-lg"
              src="https://placekitten.com/300/300"
              srcset="https://placekitten.com/500/500 500w, https://placekitten.com/800/800 800w, https://placekitten.com/1200/1200 1200w, https://placekitten.com/1500/1500 1500w, https://placekitten.com/1800/1800 1800w, https://placekitten.com/2100/2100 2100w"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
      <div className="bg-emerald-900">
        <more-info className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold tracking-wide text-center uppercase text-emerald-300">
            Here's a few ways to explore
          </h2>
          <nav-options className="grid grid-cols-2 gap-4 px-4 mt-8 md:grid-cols-6 lg:grid-cols-5 text-emerald-100">
            {navOptions.map((option, i, options) => {
              let classList = `hover:bg-emerald-300 hover:text-emerald-800 flex justify-center lg:col-span-1 p-4 rounded-xl bg-emerald-900/0 transition-all duration-300 text-lg uppercase tracking-widest ${
                options.length % 2 && options.length === i + 1
                  ? 'col-span-2 md:col-span-3'
                  : 'col-span-1 md:col-span-2'
              }`;
              return (
                <Link href={option.href} className={classList} key={i}>
                  {option.name}
                </Link>
              );
            })}
          </nav-options>
        </more-info>
      </div>
    </div>
  );
}
