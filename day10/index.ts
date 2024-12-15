import { readNumberGrid, run } from '../utils.ts';
import { add, directions, each, get, type Grid, type Position } from '../grid.ts';

function countPaths(unique: boolean) {
  return (input: Grid<number>) => {
    const backtrack = (position: Position, index: number): string[] => {
      if (get(input, position) !== index) {
        return [];
      }

      if (index === 9) {
        return [`${position.x}-${position.y}`];
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
