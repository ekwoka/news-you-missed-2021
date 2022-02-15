import { useRef, useLayoutEffect } from 'preact/hooks';

const cloudURL =
  'https://res.cloudinary.com/dmaoqyvwt/image/fetch/f_auto,q_80,w_{width}/';
const widths = [
  180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2160, 2376, 2592, 2808,
  3024,
];

export default function RespImage({ src, maxSize, autoSize, ...props }) {
  const imgRef = useRef();

  useLayoutEffect(() => {
    return attachObserver(imgRef.current);
  }, []);

  let imgBase = getCloudinaryUrl(src);
  if (!imgBase.includes('{width}')) props.src = src;

  if (imgBase.includes('{width}')) {
    const thisWidths = maxSize ? widths.filter((w) => w <= maxSize) : widths;
    props.src = imgBase.replaceAll('{width}', thisWidths[1] || thisWidths[0]);
    props.srcset = thisWidths
      .map((w) => `${imgBase.replaceAll('{width}', w)} ${w}w`)
      .join(',');
  }

  props.loading = props.loading || 'lazy';
  props.sizes = props.lodding === 'eager' ? '75vw' : '33vw';

  return <img ref={imgRef} {...props} />;
}

function getCloudinaryUrl(value) {
  if (typeof window === 'undefined')
    return `${cloudURL}https://chungmin-port.netlify.app/${value}`;
  value = new URL(value, document.baseURI).href;
  if (value.includes('localhost') || value.includes('0.0.0.0')) return value;
  return cloudURL + value;
}

function attachObserver(el) {
  if (typeof window === 'undefined') return;
  const observer = new ResizeObserver(debounceObserver(observerCB, 800));
  observer.observe(el);
  return () => observer.unobserve(el);
}

function resize(el) {
  let sizes = el.offsetWidth;
  let parent = el.parentNode;
  while (sizes < 100 && parent) {
    sizes = parent.offsetWidth;
    parent = parent.parentNode;
  }
  sizes += 'px';
  el.setAttribute('sizes', sizes);
}

function debounceObserver(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}

function observerCB(entries) {
  entries.forEach(({ target }) => resize(target));
}
