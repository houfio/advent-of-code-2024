import { readLines, run } from '../utils.ts';

type Position = [number, number];

function countCost(offset: number) {
  return (input: string[]) => {
    const positions = input.filter(Boolean).reduce<Position[]>((previous, current) => {
      const split = current.indexOf(':');
      const comma = current.indexOf(',');

      previous.push([Number(current.slice(split + 4, comma)), Number(current.slice(comma + 4))]);

      return previous;
    }, []);

    let result = 0;

    for (let i = 0; i < positions.length / 3; i++) {
      const a = positions[i * 3];
      const b = positions[i * 3 + 1];
      const target = positions[i * 3 + 2];

      target[0] += offset;
      target[1] += offset;

      const countB = (target[1] * a[0] - target[0] * a[1]) / (b[1] * a[0] - b[0] * a[1]);
      const countA = (target[0] - countB * b[0]) / a[0];

      if (countB % 1 === 0 && countA % 1 === 0) {
        result += countA * 3 + countB;
      }
    }

    return result;
  };
}

await run(readLines, [countCost(0), countCost(10000000000000)]);
