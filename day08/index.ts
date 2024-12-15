import { readGrid, run } from '../utils.ts';
import { add, copy, each, get, type Grid, mul, type Position, set, sub, within } from '../grid.ts';

function calculateNodes(repeat: boolean) {
  return (input: Grid<string>) => {
    const grid = copy(input);
    const antennas: Record<string, Position[]> = {};
    let result = 0;

    each(grid, (position) => {
      const character = get(grid, position);

      if (!character || character === '.') {
        return;
      }

      antennas[character] ??= [];
      antennas[character].push(position);
    });

    for (const [, locations] of Object.entries(antennas)) {
      const parsed = new Set<Position>();

      for (const location of locations) {
        for (const target of locations) {
          if (target === location || parsed.has(target)) {
            continue;
          }

          const results: Position[] = [];
          const offset = sub(location, target);

          if (repeat) {
            for (let pos = location; within(grid, pos); pos = add(pos, offset)) {
              results.push(pos);
            }

            for (let pos = location; within(grid, pos); pos = sub(pos, offset)) {
              results.push(pos);
            }
          } else {
            results.push(...[add(location, offset), sub(location, mul(offset, 2))].filter((pos) => within(grid, pos)));
          }

          for (const pos of results) {
            if (get(grid, pos) !== '#') {
              result++;
              set(grid, pos, '#');
            }
          }
        }

        parsed.add(location);
      }
    }

    return result;
  };
}

await run(readGrid, [calculateNodes(false), calculateNodes(true)]);
