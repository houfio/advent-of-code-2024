import { findAndFixInvalid, findValid, readInput } from './utils.ts';

const [rules, lines] = await readInput('./day5/input');

console.log('part 1', findValid(rules, lines))
console.log('part 2', findAndFixInvalid(rules, lines));
