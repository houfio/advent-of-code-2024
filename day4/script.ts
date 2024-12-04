import { readInput, searchWord } from './utils.ts';

const input = await readInput('./day4/input');

console.log('part 1', searchWord(input, 'XMAS'));
