import { calculateNodes, readInput } from './utils.ts';

const input = await readInput('./day8/input');

console.log('part 1', calculateNodes(input));
console.log('part 2', calculateNodes(input, true));
