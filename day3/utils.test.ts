import { describe, expect, test } from 'bun:test';
import { multiplyMemory } from './utils.ts';

describe('multiplyMemory', () => {
  test('multiplies correct numbers', () => {
    expect(multiplyMemory('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')).toBe(161);
  });

  test('multiplies correct numbers with conditionals', () => {
    expect(multiplyMemory("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))", true)).toBe(48);
  });
});
