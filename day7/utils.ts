import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();
  const lines = text.split(/\r?\n/).filter(Boolean);

  return lines.map((line) => line.split(/ |: /g).map(Number));
}

type Operator = (a: number, b: number) => number;

const operators: Operator[] = [(a, b) => a + b, (a, b) => a * b, (a, b) => Number(`${a}${b}`)];

function isValid(result: number, input: number[], ops: Operator[]) {
  for (let i = 0; i < ops.length ** (input.length - 1); i++) {
    let offset = i;

    const calculation = input.slice(1).reduce((previous, current) => {
      const op = offset % ops.length;

      offset = Math.floor(offset / ops.length);

      return ops[op](previous, current);
    }, input[0]);

    if (calculation === result) {
      return true;
    }
  }

  return false;
}

export function calculateValid(input: number[][], concat = false) {
  const ops = operators.slice(0, operators.length - (concat ? 0 : 1));

  return input
    .filter(([result, ...i]) => isValid(result, i, ops))
    .reduce((previous, current) => previous + current[0], 0);
}
