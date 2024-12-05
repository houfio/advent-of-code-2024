import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();
  const rules: number[][] = [];
  const lines: number[][] = [];
  let halfway = false;

  for (const line of text.split(/\r?\n/)) {
    if (!line) {
      halfway = true;

      continue;
    }

    if (!halfway) {
      const [a, b] = line.split('|');

      rules.push([Number(a), Number(b)]);
    } else {
      lines.push(line.split(',').map(Number));
    }
  }

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
      for (const [a] of invalid) {
        const indexA = line.indexOf(a);

        line = [a, ...line.slice(0, indexA), ...line.slice(indexA + 1)];
      }

      invalid = getInvalid(line);
    }

    return line;
  });
}
