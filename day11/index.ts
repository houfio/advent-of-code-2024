import { memoize, readNumbers, run } from '../utils.ts';

function blink(times: number) {
  return (input: number[]) => {
    const backtrack = memoize((value: number, remaining: number): number => {
      if (!remaining) {
        return 1;
      }

      if (!value) {
        return backtrack(1, remaining - 1);
      }

      const stringValue = String(value);

      if (stringValue.length % 2 === 0) {
        const half = stringValue.length / 2;

        return (
          backtrack(Number(stringValue.slice(0, half)), remaining - 1) +
          backtrack(Number(stringValue.slice(half)), remaining - 1)
        );
      }

      return backtrack(value * 2024, remaining - 1);
    });

    return input.reduce((previous, current) => previous + backtrack(current, times), 0);
  };
}

await run(readNumbers, [blink(25), blink(75)]);
