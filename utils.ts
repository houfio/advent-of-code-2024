import type { Grid } from './grid.ts';

export const test = Bun.argv.includes('test');
const benchmark = Bun.argv.includes('benchmark');
const parts = Bun.argv.map(Number).filter(Number.isInteger);

export async function run<T>(readInput: () => Promise<T>, fns: ((input: NoInfer<T>) => number | string)[]) {
  if (parts.length) {
    fns = fns.filter((_, i) => parts.includes(i + 1));
  }

  const input = await readInput();

  for (const fn of fns) {
    let result: number | string;
    const { done, end, log } = bench();

    do {
      const now = performance.now();

      result = fn(input);

      end(now);
    } while (!done());

    console.log(result, log());
  }
}

function bench() {
  const start = performance.now();

  let avg = 0;
  let min = 0;
  let max = 0;
  let runs = 0;

  const done = () => performance.now() - start > (benchmark ? 1000 : 0);
  const end = (time: number) => {
    const difference = performance.now() - time;

    avg = avg ? (avg + difference) / 2 : difference;
    min = min ? Math.min(min, difference) : difference;
    max = Math.max(max, difference);
    runs++;
  };
  const log = () =>
    benchmark
      ? `(avg ${avg.toFixed(3)}ms, min ${min.toFixed(3)}ms, max ${max.toFixed(3)}ms, ${runs} run${runs === 1 ? '' : 's'})`
      : `(${avg.toFixed(3)}ms)`;

  return { done, end, log };
}

export async function readText() {
  const path = Bun.main.includes('.') ? Bun.main.slice(0, Bun.main.lastIndexOf('/')) : Bun.main;
  const file = Bun.file(`${path}/input${test ? '-test' : ''}.txt`);
  const text = await file.text();

  return text.trim();
}

export async function readLines() {
  const text = await readText();

  return text.split(/\r?\n/);
}

export async function readNumbers(split: string | RegExp = '') {
  const text = await readText();

  return text.split(split).map(Number);
}

export async function readGrid(split: string | RegExp = '') {
  const lines = await readLines();

  return lines.map((line) => line.split(split)) as Grid<string>;
}

export async function readNumberGrid(split: string | RegExp = '') {
  const lines = await readLines();

  return lines.map((line) => line.split(split).map(Number)) as Grid<number>;
}

export function memoize<T extends (...args: any) => any>(fn: T) {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = args.join(';');

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const value = fn(...args);

    cache.set(key, value);

    return value;
  };
}

export function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}
