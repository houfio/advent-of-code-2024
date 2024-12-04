import { calculateDistance, calculateSimilarity, readInput } from './utils.ts';

const [left, right] = await readInput('./day1/input');

console.log('part 1', calculateDistance(left, right));
console.log('part 2', calculateSimilarity(left, right));
