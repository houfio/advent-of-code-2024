import { type Position, add } from '../grid.ts';
import { readLines, run } from '../utils.ts';

function countCost(offset: number) {
  return (input: string[]) => {
    const positions = input.filter(Boolean).reduce<Position[]>((previous, current) => {
      const split = current.indexOf(':');
      const comma = current.indexOf(',');

      previous.push({ x: Number(current.slice(split + 4, comma)), y: Number(current.slice(comma + 4)) });

      return previous;
    }, []);

    let result = 0;

    for (let i = 0; i < positions.length / 3; i++) {
      const a = positions[i * 3];
      const b = positions[i * 3 + 1];
      const target = add(positions[i * 3 + 2], offset);

      const countB = (target.y * a.x - target.x * a.y) / (b.y * a.x - b.x * a.y);
      const countA = (target.x - countB * b.x) / a.x;

      if (countB % 1 === 0 && countA % 1 === 0) {
        result += countA * 3 + countB;
      }
    }

    return result;
  };
}

await run(readLines, [countCost(0), countCost(10000000000000)]);
