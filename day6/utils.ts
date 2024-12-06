import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();

  return text.split(/\r?\n/).filter(Boolean);
}

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

function followPath(start: string, grid: string[][]) {
  let y = grid.findIndex((line) => line.includes(start));
  let x = grid[y].indexOf(start);
  let direction = 0;
  let iteration = 0;
  let nextTile: string;

  do {
    if (iteration++ > grid.length * grid[0].length) {
      return;
    }

    grid[y][x] = 'X';

    const [offsetX, offsetY] = directions[direction];

    nextTile = grid[y + offsetY]?.[x + offsetX];

    if (nextTile === '#') {
      direction = ++direction % directions.length;
    } else {
      x += offsetX;
      y += offsetY;
    }
  } while (nextTile);

  return grid.reduce((previous, current) => previous + current.filter((tile) => tile === 'X').length, 0);
}

export function calculateVisited(input: string[]) {
  return followPath(
    '^',
    input.map((line) => line.split(''))
  );
}

export function calculateLoops(input: string[]) {
  const grid = input.map((line) => line.split(''));
  let result = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== '.') {
        continue;
      }

      const newGrid = grid.map((row) => row.slice());

      newGrid[y][x] = '#';

      if (!followPath('^', newGrid)) {
        result++;
      }
    }
  }

  return result;
}
