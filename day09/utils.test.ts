import { describe, expect, test } from 'bun:test';
import { fragment } from './utils.ts';

const input = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2];

describe('fragmentByBlock', () => {
  test('calculates the correct checksum', () => {
    expect(fragment(input)).toBe(1928);
  });

  test('calculates the correct checksum with file fragmentation', () => {
    expect(fragment(input, true)).toBe(2858);
  });
});
