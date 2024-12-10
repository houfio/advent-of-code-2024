import { describe, expect, test } from 'bun:test';
import { calculatePaths } from './utils.ts';

const input = [
  [8, 9, 0, 1, 0, 1, 2, 3],
  [7, 8, 1, 2, 1, 8, 7, 4],
  [8, 7, 4, 3, 0, 9, 6, 5],
  [9, 6, 5, 4, 9, 8, 7, 4],
  [4, 5, 6, 7, 8, 9, 0, 3],
  [3, 2, 0, 1, 9, 0, 1, 2],
  [0, 1, 3, 2, 9, 8, 0, 1],
  [1, 0, 4, 5, 6, 7, 3, 2]
];

describe('calculatePaths', () => {
  test('calculates the correct number of paths', () => {
    expect(calculatePaths(input)).toBe(36);
  });

  test('calculates the correct number of unique paths', () => {
    expect(calculatePaths(input, true)).toBe(81);
  });
});
