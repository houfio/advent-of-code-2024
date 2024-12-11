import { file } from 'bun';

export async function readInput(name: string) {
  const input = file(name);
  const text = await input.text();
  const numbers = text.split(' ').filter(Boolean);

  return numbers.map(Number);
}

export function blink(input: number[], times: number) {
  const seen = new Map<string, number>();
  const count = (value: number, target: number): number => {
    if (!target) {
      return 1;
    }

    const key = `${value}-${target}`;

    if (seen.has(key)) {
      return seen.get(key) ?? 0;
    }

    let result: number;
    const stringValue = String(value);

    if (!value) {
      result = count(1, target - 1);
    } else if (stringValue.length % 2 === 0) {
      const half = stringValue.length / 2;
      const first = count(Number(stringValue.slice(0, half)), target - 1);
      const second = count(Number(stringValue.slice(half)), target - 1);

      result = first + second;
    } else {
      result = count(value * 2024, target - 1);
    }

    seen.set(key, result);

    return result;
  };

  return input.reduce((previous, current) => previous + count(current, times), 0);
}
