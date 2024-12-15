import { readLines, run } from '../utils.ts';
import { each, equals, find, get, offset, type Position, set } from '../grid.ts';

const moves = ['^', '>', 'v', '<'];
const mapping: Record<string, string> = {
  '.': '..',
  '@': '@.',
  '#': '##',
  O: '[]'
};

type Movement = { current: Position; next: Position; value: string };

function simulate(wide: boolean) {
  return (input: string[]) => {
    const halfway = input.indexOf('');
    const grid = input
      .slice(0, halfway)
      .map((line) => line.split('').flatMap((entity) => (wide ? mapping[entity].split('') : entity)));
    const actions = input.slice(halfway + 1).join('');

    const backtrack = (position: Position, direction: number, checked: Movement[]): Movement[] | undefined => {
      const newPosition = offset(position, direction);
      const collision = get(grid, newPosition);

      if (collision === '#') {
        return;
      }

      let children = collision !== '.' ? backtrack(newPosition, direction, checked) : checked;

      if (!children) {
        return;
      }

      if (direction === 0 || direction === 2) {
        const dir = collision === '[' ? 1 : collision === ']' ? 3 : 0;

        if (dir) {
          const checked = backtrack(offset(newPosition, dir), direction, []);

          if (!checked) {
            return;
          }

          children = [...children, ...checked];
        }
      }

      return [...children, { current: position, next: newPosition, value: get(grid, position) ?? '' }];
    };

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const position = find(grid, '@');

      if (!position) {
        continue;
      }

      const move = backtrack(position, moves.indexOf(action), []);

      if (move) {
        for (let j = 0; j < move.length; j++) {
          const { next, value } = move[j];

          set(grid, next, value);
        }

        const clear = move.filter((m) => !move.some((n) => equals(m.current, n.next)));

        for (const { current } of clear) {
          set(grid, current, '.');
        }
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
