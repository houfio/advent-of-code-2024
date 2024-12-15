import { readNumberGrid, run } from '../utils.ts';

function calculateResult(similarity: boolean) {
  return (input: number[][]) => {
    const left = input.flatMap((row) => row[0]).toSorted();
    const right = input.flatMap((row) => row[1]).toSorted();

    if (!similarity) {
      return left.reduce((previous, current, index) => previous + Math.abs(current - right[index]), 0);
    }

    const scores = left.map((l) => right.filter((r) => r === l).length * l);

    return scores.reduce((previous, current) => previous + current, 0);
  };
}

await run(() => readNumberGrid('   '), [calculateResult(false), calculateResult(true)]);
