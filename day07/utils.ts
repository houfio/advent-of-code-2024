import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();
  const lines = text.split(/\r?\n/).filter(Boolean);

  return lines.map((line) => line.split(/ |: /g).map(Number));
}

type Operator = (a: number, b: number) => number;

const operators: Operator[] = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => a * 10 ** (Math.floor(Math.log10(b)) + 1) + b
];

function isValid(result: number, input: number[], ops: Operator[]) {
  const backtrack = (index: number, current: number) => {
    if (index === input.length) {
      return current === result;
    }

    for (const op of ops) {
      if (backtrack(index + 1, op(current, input[index]))) {
        return true;
      }
    }

    return false;
  };

  return backtrack(1, input[0]);
}

export function calculateValid(input: number[][], concat = false) {
  const ops = operators.slice(0, operators.length - (concat ? 0 : 1));

  return input
    .filter(([result, ...i]) => isValid(result, i, ops))
    .reduce((previous, current) => previous + current[0], 0);
}
