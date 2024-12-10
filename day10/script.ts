import { calculatePaths, readInput } from './utils.ts';

const input = await readInput('./day10/input');

console.log('part 1', calculatePaths(input));
console.log('part 2', calculatePaths(input, true));
