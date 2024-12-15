import { readLines, run } from '../utils.ts';

type Position = [number, number];
type Direction = '^' | '>' | 'v' | '<';
const directions: Record<Direction, Position> = {
  '^': [0, -1],
  '>': [1, 0],
  v: [0, 1],
  '<': [-1, 0]
};

function simulate(wide: boolean) {
  return (input: string[]) => {
    const halfway = input.indexOf('');
    const grid = input.slice(0, halfway).map((line) =>
      line.split('').flatMap((entity) => {
        if (!wide) {
          return entity;
        }

        if (entity === '@') {
          return ['@', '.'];
        }

        if (entity === 'O') {
          return ['[', ']'];
        }

        return [entity, entity];
      })
    );
    const moves = input.slice(halfway + 1).join('');

    const check = (
      x: number,
      y: number,
      direction: Direction,
      checked: [Position, Position, string][]
    ): [Position, Position, string][] | undefined => {
      const [offsetX, offsetY] = directions[direction];
      const newX = x + offsetX;
      const newY = y + offsetY;
      const collision = grid[newY][newX];

      if (collision === '#') {
        return;
      }

      let children = collision !== '.' ? check(newX, newY, direction, checked) : checked;

      if (!children) {
        return;
      }

      if (direction === '^' || direction === 'v') {
        const offset = collision === '[' ? 1 : collision === ']' ? -1 : 0;

        if (offset) {
          const checked = check(newX + offset, newY, direction, []);

          if (!checked) {
            return;
          }

          children = [...children, ...checked];
        }
      }

      return [...children, [[x, y], [newX, newY], grid[y][x]]];
    };

    for (let i = 0; i < moves.length; i++) {
      const direction = moves[i] as Direction;
      const y = grid.findIndex((line) => line.includes('@'));
      const x = grid[y].indexOf('@');
      const move = check(x, y, direction, []);

      if (move) {
        for (let j = 0; j < move.length; j++) {
          const [, next, value] = move[j];

          grid[next[1]][next[0]] = value;
        }

        const clear = move.filter((m) => !move.some((n) => m[0][0] === n[1][0] && m[0][1] === n[1][1]));

        for (const [[oldX, oldY]] of clear) {
          grid[oldY][oldX] = '.';
        }
      }
    }

    let result = 0;

    for (let x = 0; x < grid[0].length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[y][x] === 'O' || grid[y][x] === '[') {
          result += x + y * 100;
        }
      }
    }

    return result;
  };
}

await run(readLines, [simulate(false), simulate(true)]);
