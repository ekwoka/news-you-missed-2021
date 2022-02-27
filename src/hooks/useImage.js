import { useState, useEffect } from 'preact/hooks';
import { useInView } from 'react-intersection-observer';

const cache = getStorageProxy('image-chache');
const queue = [];
let running = false;
let errorStreak = 0;

async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

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

function addToQueue(query, setImage, setReady) {
  queue.push({ query, setImage, setReady });
  if (!running) {
    running = true;
    processQueue();
  }
}

async function processQueue() {
  while (queue.length > 0 && errorStreak < 3) {
    console.log('Queue length:', queue.length);
    console.log('Error streak:', errorStreak);
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

function getStorageProxy(prefix) {
  if (typeof window === 'undefined') return {};
  console.log('buidling proxy');
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
