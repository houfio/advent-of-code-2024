import { describe, expect, test } from 'bun:test';
import { findAndFixInvalid, findValid } from './utils.ts';

const rules = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13]
];

const lines = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47]
];

describe('findValid', () => {
  test('finds the correct number of valid lines', () => {
    expect(findValid(rules, lines)).toBe(143);
  });
});

describe('findAndFixInvalid', () => {
  test('finds the correct number of invalid lines and fixes them', () => {
    expect(findAndFixInvalid(rules, lines)).toBe(123);
  });
});
