import { describe, expect, test } from 'bun:test';
import { blink } from './utils.ts';

const input = [125, 17];

describe('blink', () => {
  test('calculates the correct number of stones', () => {
    expect(blink(input, 6)).toBe(22);
    expect(blink(input, 25)).toBe(55312);
  });
});
