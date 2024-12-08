import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();

  return text.split(/\r?\n/).filter(Boolean);
}

type Location = [number, number];

function add(source: Location, offset: Location) {
  return [source[0] + offset[0], source[1] + offset[1]] satisfies Location;
}

function sub(source: Location, offset: Location) {
  return add(source, [-offset[0], -offset[1]]);
}

function inBounds(source: Location, width: number, height: number) {
  return source[0] >= 0 && source[0] < width && source[1] >= 0 && source[1] < height;
}

export function calculateNodes(input: string[], repeat = false) {
  const grid = input.map((line) => line.split(''));
  const antennas: Record<string, Location[]> = {};
  const width = input[0].length;
  const height = input.length;
  let result = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const character = input[y][x];

      if (character === '.') {
        continue;
      }

      antennas[character] ??= [];
      antennas[character].push([x, y]);
    }
  }

  for (const [, locations] of Object.entries(antennas)) {
    const parsed = new Set<Location>();

    for (const location of locations) {
      for (const target of locations) {
        if (target === location || parsed.has(target)) {
          continue;
        }

        const results: Location[] = [];
        const offset = sub(location, target);

        if (repeat) {
          for (let loc = location; inBounds(loc, width, height); loc = add(loc, offset)) {
            results.push(loc);
          }

          for (let loc = location; inBounds(loc, width, height); loc = sub(loc, offset)) {
            results.push(loc);
          }
        } else {
          const nodes = [add(location, offset), sub(sub(location, offset), offset)].filter((loc) =>
            inBounds(loc, width, height)
          );

          results.push(...nodes);
        }

        for (const [x, y] of results) {
          if (grid[y][x] !== '#') {
            result++;
            grid[y][x] = '#';
          }
        }
      }

      parsed.add(location);
    }
  }

  return result;
}
