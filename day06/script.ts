import { calculateLoops, calculateVisited, readInput } from './utils.ts';

const input = await readInput('./day06/input');

console.log('part 1', calculateVisited(input));
console.log('part 2', calculateLoops(input));
