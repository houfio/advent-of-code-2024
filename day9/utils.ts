import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();

  return text.trim().split('').map(Number);
}

type Data = number | null;

export function fragment(input: number[], file = false) {
  const spaced = input.flatMap<Data>((value, index) => Array(value).fill(index % 2 ? null : index / 2));
  const result = [...spaced];

  for (let i = spaced.length - 1, ii = input.length - 1; i >= 0; i -= file ? input[ii] : 1, ii--) {
    const value = spaced[i];
    const length = file ? input[ii] : 1;

    if (value === null || !length) {
      continue;
    }

    const target = result.findIndex((data, index) => {
      if (data) {
        return false;
      }

      for (let iii = 0; iii < length; iii++) {
        if (result[index + iii] !== null) {
          return false;
        }
      }

      return true;
    });

    if (!file && target >= i) {
      break;
    }

    if (target >= 0 && target < i) {
      for (let iii = 0; iii < length; iii++) {
        result[target + iii] = value;
        result[i - length + 1 + iii] = null;
      }
    }
  }

  return result.reduce<number>((previous, current, index) => previous + (current ?? 0) * index, 0);
}
