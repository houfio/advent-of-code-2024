import { calculateDistance, readInput } from './utils.ts';

const [left, right] = await readInput('./day1/input');

console.log(calculateDistance(left, right));
