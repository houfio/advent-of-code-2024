import { describe, expect, test } from 'bun:test';
import { fragment, fragmentByFile } from './utils.ts';

const input = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2];

describe('fragment', () => {
  test('calculates the correct checksum', () => {
    expect(fragment(input)).toBe(1928);
  });
});

describe('fragmentByFile', () => {
  test('calculates the correct checksum', () => {
    expect(fragmentByFile(input)).toBe(2858);
  });
});
