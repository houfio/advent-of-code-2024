import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();

  return text.split(/\r?\n/).filter(Boolean);
}

function makeGrid(input: string[], word: string) {
  const length = word.length;
  const grid = input.map((line) => line.split(''));
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

  return [grid, width, height, search] as const;
}

export function searchWord(input: string[], word: string) {
  const [grid, width, height, search] = makeGrid(input, word);
  let result = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (word.indexOf(grid[y][x][0])) {
        continue;
      }

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

      result += results.length;
    }
  }

  return result;
}

export function searchXmark(input: string[], word: string) {
  const [grid, width, height, search] = makeGrid(input, word);
  const middle = Math.floor(word.length / 2);
  let result = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid[y][x][0] !== word[middle]) {
        continue;
      }

      const results = [
        search(x - middle, y + middle, 'u', false),
        search(x + middle, y + middle, 'u', true),
        search(x - middle, y - middle, 'd', false),
        search(x + middle, y - middle, 'd', true)
      ].filter(Boolean);

      result += results.length > 1 ? 1 : 0;
    }
  }

  return result;
}
