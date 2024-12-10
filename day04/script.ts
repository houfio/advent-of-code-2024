import { readInput, searchWord, searchXmark } from './utils.ts';

const input = await readInput('./day04/input');

console.log('part 1', searchWord(input, 'XMAS'));
console.log('part 2', searchXmark(input, 'MAS'));
