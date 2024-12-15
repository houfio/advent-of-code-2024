import { type Grid, type Position, add, each, get } from '../grid.ts';
import { readGrid, run } from '../utils.ts';

function findWord(word: string, xmark: boolean) {
  return (input: Grid<string>) => {
    const array = [...word];
    const find = (position: Position, axis: string, backwards: boolean) =>
      array.every((letter, i) => {
        const pos = add(position, {
          x: axis !== 'y' ? (backwards ? -i : i) : 0,
          y: axis !== 'x' ? ((axis === 'y' && backwards) || axis === 'u' ? -i : i) : 0
        });

        return get(input, pos) === letter;
      });

    const middle = Math.floor(word.length / 2);
    const anchor = word[xmark ? middle : 0];
    let result = 0;

    each(input, (position) => {
      if (get(input, position) !== anchor) {
        return;
      }

      const results = (
        xmark
          ? [
              find(add(position, { x: -middle, y: middle }), 'u', false),
              find(add(position, middle), 'u', true),
              find(add(position, -middle), 'd', false),
              find(add(position, { x: middle, y: -middle }), 'd', true)
            ]
          : [
              find(position, 'x', false),
              find(position, 'x', true),
              find(position, 'y', false),
              find(position, 'y', true),
              find(position, 'u', false),
              find(position, 'u', true),
              find(position, 'd', false),
              find(position, 'd', true)
            ]
      ).filter(Boolean);

      result += xmark ? (results.length > 1 ? 1 : 0) : results.length;
    });

    return result;
  };
}

await run(readGrid, [findWord('XMAS', false), findWord('MAS', true)]);
