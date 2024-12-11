import { readText, run } from '../utils.ts';

function multiplyMemory(conditionals: boolean) {
  return (input: string) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do(n't)?\(\)/g;
    let enabled = true;

    return [...input.matchAll(regex)].reduce((previous, current) => {
      if (current[0].includes('()')) {
        enabled = !current[3];

        return previous;
      }

      if (conditionals && !enabled) {
        return previous;
      }

      return previous + Number(current[1]) * Number(current[2]);
    }, 0);
  };
}

await run(readText, [multiplyMemory(false), multiplyMemory(true)]);
