import { readNumbers, run } from '../utils.ts';

function calculateNumbers(sequence: boolean) {
  return (input: number[]) => {
    let result = 0;
    const map = new Map<string, number>();
    const mixAndPrune = (value: number, secret: number) => secret ^ (value % 16777216);

    for (let number of input) {
      const numbers = [number % 10];

      for (let i = 0; i < 2000; i++) {
        number = mixAndPrune(number * 64, number);
        number = mixAndPrune(Math.floor(number / 32), number);
        number = mixAndPrune(number * 2048, number);

        numbers.push(number % 10);
      }

      const diffs = numbers
        .map((value, index) => {
          if (!index) {
            return undefined;
          }

          return value - numbers[index - 1];
        })
        .filter((value) => value !== undefined) as number[];

      const set = new Set<string>();

      for (let i = 3; i < diffs.length; i++) {
        const sequence = [diffs[i - 3], diffs[i - 2], diffs[i - 1], diffs[i]].join(',');

        if (!set.has(sequence)) {
          set.add(sequence);
          map.set(sequence, (map.get(sequence) ?? 0) + numbers[i + 1]);
        }
      }

      result += number;
    }

    if (!sequence) {
      return result;
    }

    return [...map.entries()].toSorted((a, b) => b[1] - a[1])[0][1];
  };
}

await run(() => readNumbers(/\r?\n/), [calculateNumbers(false), calculateNumbers(true)]);
