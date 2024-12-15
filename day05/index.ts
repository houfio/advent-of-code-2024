import { readLines, run } from '../utils.ts';

function findValid(fix: boolean) {
  return (input: string[]) => {
    const halfway = input.indexOf('');
    const rules = input.slice(0, halfway).map((line) => line.split('|').map(Number));
    const lines = input.slice(halfway + 1).map((line) => line.split(',').map(Number));

    const getInvalid = (line: number[]) =>
      line.flatMap((value, index) => {
        const before = line.slice(0, index);
        const disallowed = rules.filter((rule) => rule[0] === value);

        return disallowed.filter((d) => before.includes(d[1]));
      });

    const valid = lines.map((line) => {
      let invalid = getInvalid(line);

      if (!fix) {
        return invalid.length ? undefined : line;
      }

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

    return valid.reduce((previous, current) => previous + (current ? current[Math.floor(current.length / 2)] : 0), 0);
  };
}

await run(readLines, [findValid(false), findValid(true)]);
