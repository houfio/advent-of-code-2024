import { readLines, run, test } from '../utils.ts';
import { add, directions, each, get, make, set, stringify } from '../grid.ts';

type Distances = Record<string, number>;

const size = test ? 7 : 71;
const bytes = test ? 12 : 1024;

function findPath(simulate: boolean) {
  return (input: string[]) => {
    const getDistance = (extra: number) => {
      const grid = make({ width: size, height: size }, '.');

      for (let i = 0; i < bytes + extra; i++) {
        const [x, y] = input[i].split(',').map(Number);

        set(grid, { x, y }, '#');
      }

      const startKey = '0-0';
      const graph: Record<string, Distances> = {};
      const distances: Distances = {};
      let queue = [{ node: startKey, distance: 0 }];

      each(grid, (position) => {
        if (get(grid, position) === '#') {
          return;
        }

        const key = stringify(position);

        graph[key] = directions.reduce<Distances>((previous, current) => {
          const pos = add(position, current);

          if (get(grid, pos) === '.') {
            previous[stringify(pos)] = 1;
          }

          return previous;
        }, {});
        distances[key] = key === startKey ? 0 : Number.POSITIVE_INFINITY;
      });

      while (queue.length) {
        const sorted = queue.toSorted((a, b) => a.distance - b.distance);
        const { node, distance } = sorted[0];

        queue = sorted.slice(1);

        if (distance === Number.POSITIVE_INFINITY) {
          break;
        }

        for (const neighbor in graph[node]) {
          const newDistance = distance + graph[node][neighbor];

          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            queue.push({ node: neighbor, distance: newDistance });
          }
        }
      }

      return distances[stringify({ x: size - 1, y: size - 1 })];
    }

    if (!simulate) {
      return getDistance(0);
    }

    const result = Array(input.length - bytes)
      .fill(undefined)
      .findIndex((_, i) => getDistance(i) === Number.POSITIVE_INFINITY);

    return input[bytes + result - 1];
  }
}

await run(readLines, [findPath(false), findPath(true)]);
