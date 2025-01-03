import { type Grid, type Position, add, directions, each, get, stringify } from '../grid.ts';
import { readNumberGrid, run } from '../utils.ts';

function countPaths(unique: boolean) {
  return (input: Grid<number>) => {
    const backtrack = (position: Position, index: number): string[] => {
      if (get(input, position) !== index) {
        return [];
      }

      if (index === 9) {
        return [stringify(position)];
      }

      return directions.flatMap((direction) => backtrack(add(position, direction), index + 1));
    };

    let result = 0;

    each(input, (position) => {
      const endpoints = backtrack(position, 0);

      result += unique ? endpoints.length : new Set(endpoints).size;
    });

    return result;
  };
}

await run(readNumberGrid, [countPaths(false), countPaths(true)]);
