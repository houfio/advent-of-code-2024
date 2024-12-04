import { describe, expect, test } from 'bun:test';
import { searchWord } from './utils.ts';

const input = [
  'MMMSXXMASM',
  'MSAMXMSMSA',
  'AMXSXMAAMM',
  'MSAMASMSMX',
  'XMASAMXAMM',
  'XXAMMXXAMA',
  'SMSMSASXSS',
  'SAXAMASAAA',
  'MAMMMXMMMM',
  'MXMXAXMASX'
];

describe('searchWord', () => {
  test('finds the correct number of words', () => {
    expect(searchWord(input, 'XMAS')).toBe(18);
  });
});
