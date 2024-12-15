import { readNumberGrid, run } from '../utils.ts';

const operators: ((a: number, b: number) => number)[] = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => a * 10 ** (Math.floor(Math.log10(b)) + 1) + b
];

function calculateValid(concat: boolean) {
  return (input: number[][]) => {
    const ops = operators.slice(0, operators.length - (concat ? 0 : 1));
    function isValid(result: number, input: number[]) {
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

    return input.filter(([result, ...i]) => isValid(result, i)).reduce((previous, current) => previous + current[0], 0);
  };
}

await run(() => readNumberGrid(/ |: /), [calculateValid(false), calculateValid(true)]);
