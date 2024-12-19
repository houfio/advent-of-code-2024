import { memoize, readLines, run } from '../utils.ts';

function findPatterns(unique: boolean) {
  return (lines: string[]) => {
    const [p, _, ...stacks] = lines;
    const patterns = p.split(', ');
    const backtrack = memoize((left: string): number => {
      let result = 0;

      for (const pattern of patterns) {
        if (left.startsWith(pattern)) {
          result += left.length === pattern.length ? 1 : backtrack(left.slice(pattern.length));

          if (result && unique) {
            return result;
          }
        }
      }

      return result;
    });

    return stacks.reduce((previous, current) => previous + backtrack(current), 0);
  };
}

await run(readLines, [findPatterns(true), findPatterns(false)]);
