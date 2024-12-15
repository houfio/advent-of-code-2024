import { mod } from './utils.ts';

export type Position = { x: number; y: number };
export type Size = { width: number; height: number };
export type PositionOrNumber = Position | number;
export type Grid<T> = T[][];

export enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3
}

export const offsets: Record<Direction, Position> = {
  [Direction.North]: { x: 0, y: -1 },
  [Direction.East]: { x: 1, y: 0 },
  [Direction.South]: { x: 0, y: 1 },
  [Direction.West]: { x: -1, y: 0 }
};

export function find<T>(grid: Grid<T>, value: T): Position | undefined {
  const y = grid.findIndex((line) => line.includes(value));

  if (y === -1) {
    return;
  }

  const x = grid[y].indexOf(value);

  if (x === -1) {
    return;
  }

  return { x, y };
}

export function get<T>(grid: Grid<T>, position: Position): T | undefined {
  return grid[position.y]?.[position.x];
}

export function set<T>(grid: Grid<T>, position: Position, value: T): void {
  const { width, height } = size(grid);
  const row = grid[mod(position.y, height)];

  if (row) {
    row[mod(position.x, width)] = value;
  }
}

export function add(a: Position, b: PositionOrNumber): Position {
  b = pos(b);

  return { x: a.x + b.x, y: a.y + b.y };
}

export function mul(a: Position, b: PositionOrNumber): Position {
  b = pos(b);

  return { x: a.x * b.x, y: a.y * b.y };
}

export function pos(value: PositionOrNumber): Position {
  if (typeof value !== 'number') {
    return value;
  }

  return { x: value, y: value };
}

export function invert(position: PositionOrNumber): PositionOrNumber {
  if (typeof position === 'number') {
    return position * -1;
  }

  return { x: position.x * -1, y: position.y * -1 };
}

export function offset(position: Position, direction: Direction, amount = 1): Position {
  return add(position, mul(offsets[direction], amount));
}

export function next(direction: Direction): Direction {
  return mod(direction + 1, Direction.West);
}

export function opposite(direction: Direction): Direction {
  return mod(direction + 2, Direction.West);
}

export function equals(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

export function size(grid: Grid<unknown>): Size {
  return { width: grid[0].length, height: grid.length };
}

export function each<T>(grid: Grid<T>, fn: (position: Position) => void): void {
  const { width, height } = size(grid);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      fn({ x, y });
    }
  }
}

export function within(grid: Grid<unknown>, position: Position): boolean {
  const { width, height } = size(grid);

  return position.x >= 0 && position.x < width && position.y >= 0 && position.y < height;
}

export function copy<T>(grid: Grid<T>): Grid<T> {
  return grid.map((row) => row.slice());
}

export function create<T>(width: number, height: number, value: T): Grid<T> {
  return Array(height).fill(undefined).map(() => Array(width).fill(value));
}
