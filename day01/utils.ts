import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();
  const lines = text.split(/\r?\n/).filter(Boolean);
  const items = lines.map((line) => line.split(/\s+/));

  return items.reduce<[number[], number[]]>(
    (previous, current) => {
      previous[0].push(Number(current[0]));
      previous[1].push(Number(current[1]));

      return previous;
    },
    [[], []]
  );
}

export function calculateDistance(left: number[], right: number[]) {
  if (left.length !== right.length) {
    throw new Error('Inputs must be the same length');
  }

  const leftSorted = left.toSorted();
  const rightSorted = right.toSorted();

  return leftSorted.reduce((previous, current, index) => previous + Math.abs(current - rightSorted[index]), 0);
}

export function calculateSimilarity(left: number[], right: number[]) {
  if (left.length !== right.length) {
    throw new Error('Inputs must be the same length');
  }

  const scores = left.map((value) => right.filter((v) => v === value).length * value);

  return scores.reduce((previous, current) => previous + current, 0);
}
