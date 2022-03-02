[![Netlify Status](https://api.netlify.com/api/v1/badges/2396f697-0ba4-4fe6-9bd6-6af500cb8b5c/deploy-status)](https://webjam-news.netlify.app/)

## 🏆 Webjam Winter 2022 🏆

# The News You Missed - 2021

This is a collection of articles, one news item from each country on the planet, that you probably missed during this last year, made for the Webjam Winter 2022 Front End Development contest.

This site is adapted from [Half and Interesting's video](https://www.youtube.com/watch?v=W3qZIPiWKc4) of the same title.

All praise for research, and complaints about inaccuracies should be directed to Sam.

## [View Site](https://webjam-news.netlify.app/)

## Technologies

Framework: Preact

Styling: TailwindCSS

Content: Netlify CMS & Markdown-to-JSX

## Challenges

### Map Zoom

Getting the map to zoom in on the clicked country was my first challenge, and the first thing I really worked on. Not exactly the simplest component to dive into when learning Preact.

I had started by borrowing someone elses World map component that used `ReactSVG` to render in an SVG upon request, but this was a class component, and of course, fucntional components are the current 🔥 hotness.

Getting it converted over was simple, but figuring out how to handle zooming was more of a challenge.

I needed to do quite a bit of math, first to figure out the the scaling factor for the map, as the SVGs size was much larger than the actual space I was providing it. From there, I'd need to find out where within the map the actual countries borders were, and from there do some cojiggering with a transform style to get the map zoomed in to the correct space.

```js
function selectCountry({ target }) {
  if (!target.id) return;
  if (active == target.getAttribute('title')) {
    setActive(undefined);
    setTarget(undefined);
    setScale(1);
    return;
  }
  route(`/map/${target.getAttribute('title').toLowerCase()}`);
  setActive(target.getAttribute('title'));
  retarget(target.getBBox());
}

function retarget({ x, y, width, height }) {
  y = y + height / 2;
  x = x + width / 2;
  let newTarget = {
    y: offset[1] / 2 / offsetFactor - y / offsetFactor,
    x: offset[0] / 2 / offsetFactor - x / offsetFactor,
  };
  setTarget(newTarget);
  setScale(0.5 / Math.max(width / offset[0], height / offset[1]));
}
```

```jsx
<style>
  {`.map-svg path[title='${active}'] {
    fill: #${Math.floor(Math.random() * 16777215).toString(16)};
  }`}
  {target
    ? `.map-svg {
    transform: scale(${scale}) translate(${target.x}px, ${target.y}px);
    }`
    : `.map-svg {
      transform: scale(${scale}) translate(0px, 0px);
  }`}
</style>
```

[Not pretty but it does the job.](src/components/map/index.js)

### Caching API requests (My First Custom Hook, with a proxy)

I didn't want to manually go and find images to go with every piece of content. So I set up a Bing image search instance, and a Netlify function to let me get the image dynamically, using country and keywords from the article contents.

The hook is a bit lazy in that it processes the requests for images in a queue, and not en-masse. This was initially due to API throttling, but I also found a few useful optimizations in not just blanting out all the requests as fast as possible. I could more easily handle errors (by requeuing the image request when it fails) and more easily manage the cache. It's likely not fit for production, as the requests often can take 400ms, so a scroll down the articles list could seem a bit sluggish as images load.

From there, I was storing the image data returned in memory, so a request for an image would only need to happen once per article during a users visit. But then I thought...how can this be overoptimized for this webjam? LocalStorage!!!

As article and keywords aren't changing often, I could store the image data in local storage instead of in memory. LocalStorage is performant enough that it would not be the bottleneck in the process of getting the image data, and to make things more challenging for myself, instead of just having simple getter and setter functions, I instead decided to wrap my cache up into a proxy.

This way I could interact with the cache the same as if it was simply in memory, but with the data coming and going to localStorage.

[I'll let the rest of the code speak for itself](src/hooks/useImage.js)
