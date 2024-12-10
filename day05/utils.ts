import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();
  const split = text.split(/\r?\n/);
  const halfway = split.indexOf('');
  const rules = split.slice(0, halfway).map((line) => line.split('|').map(Number));
  const lines = split.slice(halfway + 1).map((line) => line.split(',').map(Number));

  return [rules, lines] as const;
}

function findAndSum(
  rules: number[][],
  lines: number[][],
  fn: (line: number[], isValid: (line: number[]) => number[][]) => number[] | undefined
) {
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

export function findValid(rules: number[][], lines: number[][]) {
  return findAndSum(rules, lines, (line, getInvalid) => (!getInvalid(line).length ? line : undefined));
}

export function findAndFixInvalid(rules: number[][], lines: number[][]) {
  return findAndSum(rules, lines, (line, getInvalid) => {
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
}
