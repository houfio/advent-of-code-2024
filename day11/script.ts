import { blink, readInput } from './utils.ts';

const input = await readInput('./day11/input');

console.log('part 1', blink(input, 25));
console.log('part 1', blink(input, 75));
