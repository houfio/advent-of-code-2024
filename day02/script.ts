import { calculateSafe, readInput } from './utils.ts';

const input = await readInput('./day02/input');

console.log('part 1', calculateSafe(input));
console.log('part 2', calculateSafe(input, true));
