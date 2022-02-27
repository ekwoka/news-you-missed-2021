import PlaceholderImage from './image';

export default function PlaceholderArticle() {
  return (
    <>
      <div class="prose prose-emerald mx-auto block w-full max-w-prose animate-pulse p-4">
        <h1 class="mb-2 rounded-lg bg-neutral-300 py-1 px-2 text-transparent">
          Placeholder Title
        </h1>
      </div>
      <PlaceholderImage class="mx-auto mb-8 h-[33vh] max-w-screen-xl xl:rounded-lg" />
      <div class="prose mx-auto min-h-[50vh] w-full max-w-prose animate-pulse rounded-lg bg-neutral-300 px-4 pb-12" />
    </>
  );
}
