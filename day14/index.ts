import { mod, readLines, run, test } from '../utils.ts';

type Entity = { x: number; y: number; velocityX: number; velocityY: number };

const regex = /^p=(\d+),(\d+) v=(-?\d+),(-?\d+)$/;
const width = test ? 11 : 101;
const height = test ? 7 : 103;

function getEntities(input: string[]) {
  const entities: Entity[] = [];

  for (const line of input) {
    const [, x, y, velocityX, velocityY] = line.match(regex) ?? [];

    entities.push({ x: Number(x), y: Number(y), velocityX: Number(velocityX), velocityY: Number(velocityY) });
  }

  return entities;
}

function calculateSafety(input: string[]) {
  const quadrants = getEntities(input).reduce(
    (previous, current) => {
      const newX = mod(current.x + current.velocityX * 100, width);
      const newY = mod(current.y + current.velocityY * 100, height);

      if (newX !== width / 2 - 0.5 && newY !== height / 2 - 0.5) {
        previous[Math.round(newY / height) * 2 + Math.round(newX / width)]++;
      }

      return previous;
    },
    [0, 0, 0, 0]
  );

  return quadrants.slice(1).reduce((previous, current) => previous * current, quadrants[0]);
}

function findPattern(input: string[]) {
  const entities = getEntities(input);

  for (let i = 1; ; i++) {
    for (const entity of entities) {
      entity.x = mod(entity.x + entity.velocityX, width);
      entity.y = mod(entity.y + entity.velocityY, height);
    }

    const groups = Object.values(Object.groupBy(entities, (entity) => entity.y));

    for (const group of groups) {
      if (group?.length !== 31) {
        continue;
      }

      const sorted = group.toSorted((a, b) => a.x - b.x);

      let length = 0;
      let next = sorted[0].x;

      for (const entity of sorted) {
        if (entity.x === next) {
          length++;
        } else {
          length = 0;
        }

        next = entity.x + 1;
      }

      if (length === 31) {
        return i;
      }
    }
  }
}

await run(readLines, [calculateSafety, findPattern]);
