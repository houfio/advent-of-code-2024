import { calculateSimilarity, readInput } from './utils.ts';

const [left, right] = await readInput('./day1/input');

console.log(calculateSimilarity(left, right));
