import { type Direction, directions, each, find, get, type Grid, next, offset, previous, stringify } from '../grid.ts';
import { readGrid, run } from '../utils.ts';

type Distances = Record<string, number>;

function simulate(seats: boolean) {
  return (input: Grid<string>) => {
    const start = find(input, 'S');
    const end = find(input, 'E');

    if (!start || !end) {
      return 0;
    }

    const graph: Record<string, Distances> = {};

    each(input, (position) => {
      if (get(input, position) === '#') {
        return;
      }

      for (let direction = 0; direction < directions.length; direction++) {
        graph[`${stringify(position)}-${direction}`] = [
          direction,
          previous(direction as Direction),
          next(direction as Direction)
        ].reduce<Distances>((previous, current) => {
          const pos = offset(position, current);

          if (get(input, pos) !== '#') {
            previous[`${stringify(pos)}-${current}`] = current === direction ? 1 : 1001;
          }

          return previous;
        }, {});
      }
    });

    const startKey = `${stringify(start)}-1`;
    const endKey = `${stringify(end)}-0`;
    const distances = Object.keys(graph).reduce<Distances>((previous, current) => {
      previous[current] = current === startKey ? 0 : Number.POSITIVE_INFINITY;

      return previous;
    }, {});
    const predecessors: Record<string, string[]> = {};
    let queue = [{ node: startKey, distance: 0 }];

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
          predecessors[neighbor] = [node];
          queue.push({ node: neighbor, distance: newDistance });
        } else if (newDistance === distances[neighbor]) {
          predecessors[neighbor].push(node);
        }
      }
    }

    if (!seats) {
      return distances[endKey];
    }

    const visited = new Set<string>();
    let stack = [endKey];

    while (stack.length) {
      const current = stack[stack.length - 1];

      visited.add(current.slice(0, current.lastIndexOf('-')));
      stack = [
        ...stack.slice(0, -1),
        ...predecessors[current] ?? []
      ];
    }

    return visited.size;
  };
}

await run(readGrid, [simulate(false), simulate(true)]);
