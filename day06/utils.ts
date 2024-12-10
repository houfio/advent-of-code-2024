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

function followPath(start: string, grid: (string | number)[][]) {
  let y = grid.findIndex((line) => line.includes(start));
  let x = grid[y].indexOf(start);
  let direction = 0;
  let nextTile: string | number;
  let walked = 0;

  do {
    if (typeof grid[y][x] !== 'number') {
      walked++;
      grid[y][x] = direction;
    } else if (grid[y][x] === direction) {
      return;
    }

    const [offsetX, offsetY] = directions[direction];

    nextTile = grid[y + offsetY]?.[x + offsetX];

    if (nextTile === '#') {
      direction = ++direction % directions.length;
    } else {
      x += offsetX;
      y += offsetY;
    }
  } while (nextTile !== undefined);

  return walked;
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
