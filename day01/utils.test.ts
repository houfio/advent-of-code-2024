import { describe, expect, test } from 'bun:test';
import { calculateDistance, calculateSimilarity } from './utils.ts';

const left = [3, 4, 2, 1, 3, 3];
const right = [4, 3, 5, 3, 9, 3];

describe('calculateDistance', () => {
  test('validates input lengths', () => {
    expect(() => calculateDistance([], [0])).toThrow('Inputs must be the same length');
  });

  test('calculates correct distance', () => {
    expect(calculateDistance(left, right)).toBe(11);
  });
});

describe('calculateSimilarity', () => {
  test('validates input lengths', () => {
    expect(() => calculateSimilarity([], [0])).toThrow('Inputs must be the same length');
  });

  test('calculates correct similarity', () => {
    expect(calculateSimilarity(left, right)).toBe(31);
  });
});
