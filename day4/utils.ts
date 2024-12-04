import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();

  return text.split(/\r?\n/).filter(Boolean);
}

export function searchWord(input: string[], word: string) {
  const length = word.length;
  const grid = input.map((line) => line.split(''));
  const width = grid[0].length;
  const height = grid.length;

  const search = (x: number, y: number, axis: string, backwards: boolean) => {
    const minX = axis !== 'y' && backwards ? x - (length - 1) : x;
    const maxX = axis !== 'y' && !backwards ? x + (length - 1) : x;
    const minY = axis === 'u' || (axis === 'y' && backwards) ? y - (length - 1) : y;
    const maxY = axis === 'd' || (axis === 'y' && !backwards) ? y + (length - 1) : y;

    if (minX < 0 || maxX >= width || minY < 0 || maxY >= height) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      const currentX = axis !== 'y' ? x + (backwards ? -i : i) : x;
      const currentY = axis !== 'x' ? y + ((axis === 'y' && backwards) || axis === 'u' ? -i : i) : y;

      if (grid[currentY][currentX] !== word[i]) {
        return false;
      }
    }

    return true;
  };

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
