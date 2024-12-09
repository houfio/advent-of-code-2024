import { fragment, fragmentByFile, readInput } from './utils.ts';

const input = await readInput('./day9/input');

console.log('part 1', fragment(input));
console.log('part 2', fragmentByFile(input));
