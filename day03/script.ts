import { multiplyMemory, readInput } from './utils.ts';

const input = await readInput('./day3/input');

console.log('part 1', multiplyMemory(input));
console.log('part 2', multiplyMemory(input, true));
