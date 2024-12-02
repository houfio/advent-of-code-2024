import { file } from 'bun';
import { calculateDistance } from './calculateDistance.ts';

const input = file('./day1/input');
const text = await input.text();
const lines = text.split(/\r?\n/).filter(Boolean);
const items = lines.map((line) => line.split(/\s+/));
const [left, right] = items.reduce<[number[], number[]]>((previous, current) => {
  previous[0].push(Number(current[0]));
  previous[1].push(Number(current[1]));

  return previous;
}, [[], []]);

console.log(calculateDistance(left, right));
