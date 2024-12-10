import { describe, expect, test } from 'bun:test';
import { calculateSafe } from './utils.ts';

const input = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9]
];

describe('calculateSafe', () => {
  test('calculates correct safe number', () => {
    expect(calculateSafe(input)).toBe(2);
  });

  test('calculates correct safe number with dampener', () => {
    expect(calculateSafe(input, true)).toBe(4);
  });
});
