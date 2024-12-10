import { describe, expect, test } from 'bun:test';
import { calculateNodes } from './utils.ts';

const input = [
  '............',
  '........0...',
  '.....0......',
  '.......0....',
  '....0.......',
  '......A.....',
  '............',
  '............',
  '........A...',
  '.........A..',
  '............',
  '............'
];

describe('calculateNodes', () => {
  test('calculates the correct number of nodes', () => {
    expect(calculateNodes(input)).toBe(14);
  });

  test('calculates the correct number of nodes when repeated', () => {
    expect(calculateNodes(input, true)).toBe(34);
  });
});
