import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();
  const lines = text.split(/\r?\n/).filter(Boolean);

  return lines.map((line) => line.split(/\s+/).map(Number));
}

export function calculateSafe(input: number[][]) {
  const safe = input.filter((data) => {
    const compare = (fn: (a: number, b: number) => boolean) =>
      data.every((value, index) => !index || fn(value, data[index - 1]));

    if (!compare((a, b) => a > b) && !compare((a, b) => a < b)) {
      return false;
    }

    return compare((a, b) => Math.abs(a - b) < 4);
  });

  return safe.length;
}
