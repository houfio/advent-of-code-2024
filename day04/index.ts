import { readGrid, run } from '../utils.ts';

function makeGrid(input: string[][], word: string) {
  const length = word.length;
  const grid = input.map((line) => line.slice());
  const width = grid[0].length;
  const height = grid.length;

  const search = (x: number, y: number, axis: string, backwards: boolean) => {
    for (let i = 0; i < length; i++) {
      const currentX = axis !== 'y' ? x + (backwards ? -i : i) : x;
      const currentY = axis !== 'x' ? y + ((axis === 'y' && backwards) || axis === 'u' ? -i : i) : y;

      if (grid[currentY]?.[currentX] !== word[i]) {
        return false;
      }
    }

    return true;
  };

  const sumForEach = (fn: (x: number, y: number) => number) =>
    Array(width * height)
      .fill(undefined)
      .reduce<number>((previous, _, index) => previous + fn(index % width, Math.floor(index / width)), 0);

  return [sumForEach, search] as const;
}

function searchWord(input: string[][]) {
  const [sumForEach, search] = makeGrid(input, 'XMAS');

  return sumForEach((x, y) => {
    const results = [
      search(x, y, 'x', false),
      search(x, y, 'x', true),
      search(x, y, 'y', false),
      search(x, y, 'y', true),
      search(x, y, 'u', false),
      search(x, y, 'u', true),
      search(x, y, 'd', false),
      search(x, y, 'd', true)
    ].filter(Boolean);

    return results.length;
  });
}

function searchXmark(input: string[][]) {
  const [sumForEach, search] = makeGrid(input, 'MAS');

  return sumForEach((x, y) => {
    const results = [
      search(x - 1, y + 1, 'u', false),
      search(x + 1, y + 1, 'u', true),
      search(x - 1, y - 1, 'd', false),
      search(x + 1, y - 1, 'd', true)
    ].filter(Boolean);

    return results.length > 1 ? 1 : 0;
  });
}

await run(readGrid, [searchWord, searchXmark]);
