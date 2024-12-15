import { type Grid, copy, each, find, get, next, offset, set } from '../grid.ts';
import { readGrid, run } from '../utils.ts';

function followPath(start: string, grid: Grid<string | number>) {
  let position = find(grid, start);

  if (!position) {
    return;
  }

  let direction = 0;
  let nextTile: string | number | undefined;
  let walked = 0;

  do {
    const value = get(grid, position);
    const nextPosition = offset(position, direction);

    if (typeof value !== 'number') {
      walked++;
      set(grid, position, direction);
    } else if (value === direction) {
      return;
    }

    nextTile = get(grid, nextPosition);

    if (nextTile === '#') {
      direction = next(direction);
    } else {
      position = nextPosition;
    }
  } while (nextTile !== undefined);

  return walked;
}

function calculateVisited(input: Grid<string>) {
  return followPath('^', copy(input)) ?? 0;
}

function calculateLoops(input: Grid<string>) {
  let result = 0;

  each(input, (pos) => {
    if (get(input, pos) !== '.') {
      return;
    }

    const grid = copy(input);

    set(grid, pos, '#');

    if (!followPath('^', grid)) {
      result++;
    }
  });

  return result;
}

await run(readGrid, [calculateVisited, calculateLoops]);
