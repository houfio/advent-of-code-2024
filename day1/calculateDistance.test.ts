import { expect, test } from 'bun:test';
import { calculateDistance } from './calculateDistance';

test('validates input lengths', () => {
  expect(() => calculateDistance([], [0])).toThrow('Inputs must be the same length');
});

test('calculates correct distance', () => {
  const left = [3, 4, 2, 1, 3, 3];
  const right = [4, 3, 5, 3, 9, 3];

  expect(calculateDistance(left, right)).toBe(11);
});
