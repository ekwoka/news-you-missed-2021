export default function Searchbar({ query, callback, ...props }) {
  return (
    <search-bar {...props}>
      <floating-label>
        <input
          type="text"
          name="search"
          value={query}
          onInput={callback}
          placeholder="Search Here... (Fruit Bats, Global Warming, Korea, etc)"
        />
        <label for="search" class="truncate pr-8">
          Search Here... (Fruit Bats, Global Warming, Korea, etc)
        </label>
      </floating-label>
    </search-bar>
  );
}
