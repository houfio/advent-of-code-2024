import { readLines, run } from '../utils.ts';

const width = 5;
const height = 7;

function decodeLock(input: string[]) {
  const { locks, keys } = input.reduce<{ locks: number[][]; keys: number[][] }>(
    (previous, current, index) => {
      if (index % (height + 1) !== 0) {
        return previous;
      }

      const grid = input.slice(index, index + height);
      const size = Array(width)
        .fill(0)
        .map((_, i) => grid.filter((line) => line[i] === '#').length - 1);

      if (current[0] === '#') {
        previous.locks.push(size);
      } else {
        previous.keys.push(size);
      }

      return previous;
    },
    { locks: [], keys: [] }
  );

  let result = 0;

  for (const lock of locks) {
    for (const key of keys) {
      const added = lock.map((value, i) => value + key[i]);

      if (added.every((value) => value <= height - 2)) {
        result++;
      }
    }
  }

  return result;
}

await run(readLines, [decodeLock]);
