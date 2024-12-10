import { calculateValid, readInput } from './utils.ts';

const input = await readInput('./day07/input');

console.log('part 1', calculateValid(input));
console.log('part 2', calculateValid(input, true));
