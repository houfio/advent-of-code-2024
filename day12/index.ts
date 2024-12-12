import { readGrid, run } from '../utils.ts';

type Position = [number, number];
const directions: Position[] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];
const corners: Position[] = [
  [3, 0],
  [1, 0],
  [1, 2],
  [3, 2]
];

function countSides(distinct: boolean) {
  return (input: string[][]) => {
    const visited = new Set<string>();
    let result = 0;

    const backtrack = (x: number, y: number, wanted: string, parents: Position[]): [number, number] => {
      const key = `${x}-${y}`;

      if (input[y]?.[x] !== wanted) {
        return [0, distinct ? 0 : 1];
      }

      if (visited.has(key)) {
        return [0, 0];
      }

      visited.add(key);

      const next = directions.map(([oX, oY]) => backtrack(x + oX, y + oY, wanted, [...parents, [x, y]]));
      const area = next.reduce((previous, current) => previous + current[0], 0);
      const edges = next.reduce((previous, current) => previous + current[1], 0);
      const found = corners.filter((corner) => {
        if (!distinct) {
          return false;
        }

        const [hX, hY] = directions[corner[0]];
        const [vX, vY] = directions[corner[1]];
        const adjacent = [
          [x + hX, y + vY],
          [x + hX, y + hY],
          [x + vX, y + vY]
        ].map(([aX, aY]) => ({
          seen: parents.some(([pX, pY]) => pX === aX && pY === aY),
          matches: input[aY]?.[aX] === wanted
        }));
        const sameGroup = adjacent.filter((tile) => tile.matches).length;

        if (sameGroup === 0 || sameGroup === 2) {
          return !adjacent.some((tile) => tile.seen);
        }

        return adjacent[0].matches && !adjacent[1].matches && !adjacent[1].matches;
      });

      return [area + 1, edges + found.length];
    };

    for (let x = 0; x < input[0].length; x++) {
      for (let y = 0; y < input.length; y++) {
        const [area, edges] = backtrack(x, y, input[y][x], []);

        result += area * edges;
      }
    }

    return result;
  };
}

await run(readGrid, [countSides(false), countSides(true)]);
