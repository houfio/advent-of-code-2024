import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();

  return text.trim().split('').map(Number);
}

type Data = number | null;

function spaceData(input: number[]) {
  return input.flatMap<Data>((value, index) => Array(value).fill(index % 2 ? null : index / 2));
}

function calculateChecksum(input: Data[]) {
  return input.reduce<number>((previous, current, index) => previous + (current ?? 0) * index, 0);
}

export function fragment(input: number[]) {
  const spaced = spaceData(input);

  for (let i = 0; i < spaced.length; i++) {
    if (spaced[i] !== null) {
      continue;
    }

    const last = spaced.findLastIndex((v) => v !== null);

    if (last <= i) {
      break;
    }

    spaced[i] = spaced[last];
    spaced[last] = null;
  }

  return calculateChecksum(spaced);
}

export function fragmentByFile(input: number[]) {
  const spaced = spaceData(input);
  const result = spaced.slice();

  for (let i = spaced.length - 1, ii = input.length - 1; i >= 0; i -= input[ii--]) {
    const value = spaced[i];
    const length = input[ii];

    if (value === null || !length) {
      continue;
    }

    const target = spaced.findIndex(
      (data, index) => !data && result.slice(index, index + length).every((v) => v === null)
    );

    if (target >= 0 && target < i) {
      result.splice(target, length, ...result.slice(i - length + 1, i + 1));
      result.splice(i - length + 1, length, ...Array(length).fill(null));
    }
  }

  return calculateChecksum(result);
}
