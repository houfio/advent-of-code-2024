import { describe, expect, test } from 'bun:test';
import { calculateLoops, calculateVisited } from './utils.ts';

const input = [
  '....#.....',
  '.........#',
  '..........',
  '..#.......',
  '.......#..',
  '..........',
  '.#..^.....',
  '........#.',
  '#.........',
  '......#...'
];

describe('calculateVisited', () => {
  test('calculates the correct number of visited tiles', () => {
    expect(calculateVisited(input)).toBe(41);
  });
});

describe('calculateLoops', () => {
  test('calculates the correct number of infinite loops', () => {
    expect(calculateLoops(input)).toBe(6);
  });
});
