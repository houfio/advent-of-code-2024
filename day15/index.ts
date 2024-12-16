import { type Position, each, find, get, offset, set } from '../grid.ts';
import { readLines, run } from '../utils.ts';

const moves = ['^', '>', 'v', '<'];
const mapping: Record<string, string> = {
  '.': '..',
  '@': '@.',
  '#': '##',
  O: '[]'
};

function simulate(wide: boolean) {
  return (input: string[]) => {
    const halfway = input.indexOf('');
    const grid = input
      .slice(0, halfway)
      .map((line) => line.split('').flatMap((entity) => (wide ? mapping[entity].split('') : entity)));
    const actions = input.slice(halfway + 1).join('');

    const backtrack = (position: Position, direction: number, move: boolean): boolean => {
      const newPosition = offset(position, direction);
      const collision = get(grid, newPosition);

      if (collision === '#') {
        return false;
      }

      if (direction === 0 || direction === 2) {
        const dir = collision === '[' ? 1 : collision === ']' ? 3 : 0;

        if (dir && !backtrack(offset(newPosition, dir), direction, move)) {
          return false;
        }
      }

      if (collision === '.' || backtrack(newPosition, direction, move)) {
        if (move) {
          const value = get(grid, position);

          set(grid, newPosition, value);
          set(grid, position, '.');
        }

        return true;
      }

      return false;
    };

    for (let i = 0; i < actions.length; i++) {
      const direction = moves.indexOf(actions[i]);
      const position = find(grid, '@');

      if (!position) {
        continue;
      }

      if (backtrack(position, direction, false)) {
        backtrack(position, direction, true);
      }
    }

    let result = 0;

    each(grid, (position) => {
      const value = get(grid, position);

      if (value === 'O' || value === '[') {
        result += position.x + position.y * 100;
      }
    });

    return result;
  };
}

await run(readLines, [simulate(false), simulate(true)]);
