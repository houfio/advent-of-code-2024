import { type Grid, type Position, add, directions, each, equals, get, stringify } from '../grid.ts';
import { readGrid, run } from '../utils.ts';

const corners: Position[] = [
  { x: 3, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 2 },
  { x: 3, y: 2 }
];

function countSides(distinct: boolean) {
  return (input: Grid<string>) => {
    const visited = new Set<string>();
    let result = 0;

    const backtrack = (position: Position, wanted: string, parents: Position[]): [number, number] => {
      if (get(input, position) !== wanted) {
        return [0, distinct ? 0 : 1];
      }

      const key = stringify(position);

      if (visited.has(key)) {
        return [0, 0];
      }

      visited.add(key);

      const next = directions.map((direction) => backtrack(add(position, direction), wanted, [...parents, position]));
      const area = next.reduce((previous, current) => previous + current[0], 0);
      const edges = next.reduce((previous, current) => previous + current[1], 0);
      const found = corners.filter((corner) => {
        if (!distinct) {
          return false;
        }

        const horizontal = directions[corner.x];
        const vertical = directions[corner.y];
        const adjacent = [
          add(position, { x: horizontal.x, y: vertical.y }),
          add(position, horizontal),
          add(position, vertical)
        ].map((pos) => ({
          seen: parents.some((p) => equals(pos, p)),
          matches: get(input, pos) === wanted
        }));
        const sameGroup = adjacent.filter((tile) => tile.matches).length;

        if (sameGroup === 0 || sameGroup === 2) {
          return !adjacent.some((tile) => tile.seen);
        }

        return adjacent[0].matches && !adjacent[1].matches && !adjacent[1].matches;
      });

      return [area + 1, edges + found.length];
    };

    each(input, (position) => {
      const [area, edges] = backtrack(position, get(input, position) ?? '', []);

      result += area * edges;
    });

    return result;
  };
}

await run(readGrid, [countSides(false), countSides(true)]);
