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

      const next = directions.map((d) => backtrack(x + d[0], y + d[1], wanted, [...parents, [x, y]]));
      const area = next.reduce((previous, current) => previous + current[0], 0);
      const edges = next.reduce((previous, current) => previous + current[1], 0);

      const found = !distinct
        ? []
        : corners.filter((corner) => {
            const horizontal = directions[corner[0]];
            const vertical = directions[corner[1]];
            const positions: Position[] = [
              [x + horizontal[0], y + vertical[1]],
              [x + horizontal[0], y + horizontal[1]],
              [x + vertical[0], y + vertical[1]]
            ];
            const seen = positions.map((pos) => parents.some((parent) => parent[0] === pos[0] && parent[1] === pos[1]));
            const matches = positions.map((pos) => input[pos[1]]?.[pos[0]] === wanted);
            const matchesCount = matches.filter(Boolean).length;

            if (matchesCount === 0 || matchesCount === 2) {
              return !seen.some(Boolean);
            }

            return matches[0] && !matches[1] && !matches[1];
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
