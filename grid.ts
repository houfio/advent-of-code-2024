import { mod } from './utils.ts';

export type Position = { x: number; y: number };
export type Size = { width: number; height: number };
export type PositionOrNumber = Position | number;
export type Grid<T> = T[][];

export const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
] as const satisfies Position[];

export type Direction = 0 | 1 | 2 | 3;

export function find<T>(grid: Grid<T>, value: T) {
  const y = grid.findIndex((line) => line.includes(value));

  if (y === -1) {
    return;
  }

  const x = grid[y].indexOf(value);

  if (x === -1) {
    return;
  }

  return { x, y } satisfies Position;
}

export function get<T>(grid: Grid<T>, position: Position): T | undefined {
  return grid[position.y]?.[position.x];
}

export function set<T>(grid: Grid<T>, position: Position, value: T) {
  const { width, height } = size(grid);
  const row = grid[mod(position.y, height)];

  if (row) {
    row[mod(position.x, width)] = value;
  }
}

export function add(a: Position, b: PositionOrNumber) {
  b = pos(b);

  return { x: a.x + b.x, y: a.y + b.y } satisfies Position;
}

export function sub(a: Position, b: PositionOrNumber) {
  return add(a, invert(b));
}

export function mul(a: Position, b: PositionOrNumber) {
  b = pos(b);

  return { x: a.x * b.x, y: a.y * b.y } satisfies Position;
}

export function pos(value: PositionOrNumber) {
  if (typeof value !== 'number') {
    return value;
  }

  return { x: value, y: value } satisfies Position;
}

export function invert(position: PositionOrNumber) {
  if (typeof position === 'number') {
    return position * -1;
  }

  return { x: position.x * -1, y: position.y * -1 };
}

export function offset(position: Position, direction: number, amount = 1) {
  return add(position, mul(directions[direction], amount));
}

export function next(direction: Direction) {
  return mod(direction + 1, directions.length) as Direction;
}

export function previous(direction: Direction) {
  return mod(direction - 1, directions.length) as Direction;
}

export function opposite(direction: Direction) {
  return mod(direction + 2, directions.length) as Direction;
}

export function equals(a: Position, b: Position) {
  return a.x === b.x && a.y === b.y;
}

export function size(grid: Grid<unknown>) {
  return { width: grid[0].length, height: grid.length } satisfies Size;
}

export function each<T>(grid: Grid<T>, fn: (position: Position) => void) {
  const { width, height } = size(grid);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      fn({ x, y });
    }
  }
}

export function within(grid: Grid<unknown>, position: Position) {
  const { width, height } = size(grid);

  return position.x >= 0 && position.x < width && position.y >= 0 && position.y < height;
}

export function copy<T>(grid: Grid<T>) {
  return grid.map((row) => row.slice()) satisfies Grid<T>;
}

export function make<T>(size: Size, value: T) {
  return Array(size.height)
    .fill(undefined)
    .map(() => Array(size.width).fill(value)) as Grid<T>;
}

export function stringify(gridOrPosition: Grid<unknown> | Position) {
  if (!Array.isArray(gridOrPosition)) {
    return `${gridOrPosition.x}-${gridOrPosition.y}`;
  }

  return gridOrPosition.map((row) => row.join('')).join('\n');
}
