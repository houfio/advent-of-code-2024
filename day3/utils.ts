import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);

  return await input.text();
}

export function multiplyMemory(input: string, conditionals = false) {
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
}
