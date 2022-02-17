export default function shuffleArray(arr) {
  const result = [...arr];
  let remaining = result.length;

  while (remaining--) {
    const random = Math.floor(Math.random() * remaining);
    [result[remaining], result[random]] = [result[random], result[remaining]];
  }

  return result;
}
