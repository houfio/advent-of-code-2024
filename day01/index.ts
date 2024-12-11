import { readNumberGrid, run } from '../utils.ts';

function calculateDistance(input: number[][]) {
  const leftSorted = input.flatMap((row) => row[0]).toSorted();
  const rightSorted = input.flatMap((row) => row[1]).toSorted();

  return leftSorted.reduce((previous, current, index) => previous + Math.abs(current - rightSorted[index]), 0);
}

function calculateSimilarity(input: number[][]) {
  const left = input.flatMap((row) => row[0]);
  const right = input.flatMap((row) => row[1]);
  const scores = left.map((value) => right.filter((v) => v === value).length * value);

  return scores.reduce((previous, current) => previous + current, 0);
}

await run(() => readNumberGrid('   '), [calculateDistance, calculateSimilarity]);
