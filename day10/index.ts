import { readNumberGrid, run } from '../utils.ts';

function countPaths(unique: boolean) {
  return (input: number[][]) => {
    const backtrack = (x: number, y: number, index: number): string[] => {
      if (input[x]?.[y] !== index) {
        return [];
      }

      if (index === 9) {
        return [`${x}-${y}`];
      }

      return [
        ...backtrack(x - 1, y, index + 1),
        ...backtrack(x + 1, y, index + 1),
        ...backtrack(x, y - 1, index + 1),
        ...backtrack(x, y + 1, index + 1)
      ];
    };

    let result = 0;

    for (let x = 0; x < input[0].length; x++) {
      for (let y = 0; y < input.length; y++) {
        const endpoints = backtrack(x, y, 0);

        result += unique ? endpoints.length : new Set(endpoints).size;
      }
    }

    return result;
  };
}

await run(readNumberGrid, [countPaths(false), countPaths(true)]);
