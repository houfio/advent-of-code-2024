import { readLines, run } from '../utils.ts';

function findAndSum(
  input: string[],
  fn: (line: number[], isValid: (line: number[]) => number[][]) => number[] | undefined
) {
  const halfway = input.indexOf('');
  const rules = input.slice(0, halfway).map((line) => line.split('|').map(Number));
  const lines = input.slice(halfway + 1).map((line) => line.split(',').map(Number));

  const getInvalid = (line: number[]) =>
    line.flatMap((value, index) => {
      const before = line.slice(0, index);
      const disallowed = rules.filter((rule) => rule[0] === value);

      return disallowed.filter((d) => before.includes(d[1]));
    });

  return lines.reduce((previous, current) => {
    const sum = fn(current, getInvalid);

    return previous + (sum ? sum[Math.floor(sum.length / 2)] : 0);
  }, 0);
}

function findValid(fix: boolean) {
  return (input: string[]) => {
    return findAndSum(input, (line, getInvalid) => {
      if (!fix) {
        return !getInvalid(line).length ? line : undefined;
      }

      let invalid = getInvalid(line);

      if (!invalid.length) {
        return;
      }

      while (invalid.length) {
        for (const [n] of invalid) {
          const index = line.indexOf(n);

          line = [n, ...line.slice(0, index), ...line.slice(index + 1)];
        }

        invalid = getInvalid(line);
      }

      return line;
    });
  };
}

await run(readLines, [findValid(false), findValid(true)]);
