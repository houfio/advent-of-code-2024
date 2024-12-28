import { readLines, run } from '../utils.ts';

function connect(limit: boolean) {
  return (input: string[]) => {
    const sets: Record<string, string[]> = {};

    for (const connection of input) {
      const [left, right] = connection.split('-');

      sets[left] ??= [];
      sets[left].push(right);
      sets[right] ??= [];
      sets[right].push(left);
    }

    const seen = new Map<string, boolean>();

    for (const [key, connections] of Object.entries(sets)) {
      for (let i = 0; i < connections.length; i++) {
        for (let j = 0; j < connections.length; j++) {
          if (i === j) {
            continue;
          }

          if (limit) {
            const keys = [key, connections[i], connections[j]].toSorted((a, b) => a.localeCompare(b));
            const joined = keys.join(',');

            if (seen.has(joined)) {
              continue;
            }

            seen.set(joined, sets[connections[i]].includes(connections[j]));
          } else {
            const keys = [key, ...connections.filter((k) => sets[k].some((kk) => connections.includes(kk)))].toSorted(
              (a, b) => a.localeCompare(b)
            );
            const joined = keys.join(',');

            if (seen.has(joined)) {
              continue;
            }

            seen.set(
              joined,
              keys.every((k) => keys.every((kk) => k === kk || sets[k].includes(kk)))
            );
          }
        }
      }
    }

    if (limit) {
      const filtered = [...seen.entries()].filter(([key, value]) => key.match(/,?t\w/) && value);

      return filtered.length;
    }

    const filtered = [...seen.entries()].filter(([, value]) => value).toSorted((a, b) => b[0].length - a[0].length);

    return filtered[0][0];
  };
}

await run(readLines, [connect(true), connect(false)]);
