import { useState, useEffect } from 'preact/hooks';
import { useInView } from 'react-intersection-observer';

/* This whole thing is a bit hacky, as it's my first time using Preact, and of course, my first time making any custom hooks, or even using proxies.

Goal: Dynamically fetch images for each country, store them in a cache so there is no need to do repeat fetches for the same country, and mirror the data to Local Storage.

Challenges: 3 request per second to API, don't fetch uneeded image data.

*/

// Initialize Cache as Proxy to localStorage

const cache = getStorageProxy('image-chache');

// custom hook useImage, handles intersection observer to the image if lazyloading is neaded, and checks for image in cache, otherwise adds it to request queue

export default function useImage(query, delay = false) {
  const { ref, inView } = useInView();
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if ((delay && !inView) || image) return;
    const q = query.replace(/[^a-zA-Z0-9 ]/g, '');
    if (cache[q]) {
      setImage(cache[q]);
      setReady(true);
    } else {
      addToQueue(q, setImage, setReady);
    }
  }, [query, inView, delay]);

  return [image, ready, ref];
}

// Get image does a second check against the cache. This is to handle situations where an image is added to the queue multiple times and thus the first successful request can be used across all the slots in the queue

async function getImage(q) {
  if (!q) return;
  if (cache[q]) {
    return cache[q];
  } else {
    const image = await fetchImage(q);
    if (image.contentUrl) cache[q] = image;
    return image;
  }
}

async function fetchImage(q) {
  if (typeof window === 'undefined') return '';
  const url = new URL(location);
  url.pathname = '/api/image';
  url.search = new URLSearchParams({ q }).toString();
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) return {};
  const data = await response.json();
  return data;
}

/* Queue

Stores pending image search requests.

Processes the requests one at a time. Bing image search has a free limit of 3 searches per second. Processing them one at a time manages this well.

Image requests that fail are added to the end of the stack, and a slight delay is instated. If 3 image requests fail in a row, the queue stops being processed until the page is refreshed.

*/

const queue = [];
let running = false;
let errorStreak = 0;

function addToQueue(query, setImage, setReady) {
  queue.push({ query, setImage, setReady });
  if (!running) {
    running = true;
    processQueue();
  }
}

async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function processQueue() {
  while (queue.length > 0 && errorStreak < 3) {
    const { query, setImage, setReady } = queue.shift();
    const image = await getImage(query);
    if (image.contentUrl) {
      setImage(image);
      setReady(true);
      errorStreak = 0;
    } else {
      setReady(false);
      queue.push({ query, setImage, setReady });
      errorStreak++;
      await sleep(200);
    }
  }
  if (errorStreak >= 3) console.log('Error streak reached');
  if (errorStreak < 3) console.log('Queue emptied');
  running = false;
  errorStreak = 0;
}

// The storage proxy for the cache. Simply checks for image data in localstorage and sets image data to localstorage. Localstorage is performant enough there isn't a need for keeping the cache in active memory in this use case.

function getStorageProxy(prefix) {
  if (typeof window === 'undefined') return {};
  return new Proxy(
    {},
    {
      set: (obj, prop, value) => {
        localStorage.setItem(
          `${prefix}.${prop.replace(' ', '-')}`,
          JSON.stringify(value)
        );
        return true;
      },
      get: (obj, prop) => {
        return JSON.parse(
          localStorage.getItem(`${prefix}.${prop.replace(' ', '-')}`)
        );
      },
    }
  );
}
