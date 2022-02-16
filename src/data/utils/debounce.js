export default function debounce(callback, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    console.log('debouncing');
    timeout = setTimeout(() => {
      console.log('bouncing...');
      callback(...args);
    }, delay);
  };
}
