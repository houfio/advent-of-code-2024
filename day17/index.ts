import { readText, run } from '../utils.ts';

function execute(find: boolean) {
  return (input: string) => {
    const [a, b, c, ...program] = input.match(/\d+/g)?.map(Number) ?? [];
    const loop = (register: [bigint, bigint, bigint]) => {
      const output: number[] = [];

      for (let pointer = 0; pointer < program.length; pointer += 2) {
        const [instruction, literal] = program.slice(pointer, pointer + 2);
        const combo = BigInt(literal > 3 && literal < 7 ? register[literal - 4] : literal);

        switch (instruction) {
          case 0:
            register[0] /= 2n ** combo;
            break;
          case 1:
            register[1] ^= BigInt(literal);
            break;
          case 2:
            register[1] = combo % 8n;
            break;
          case 3:
            pointer = register[0] ? literal - 2 : pointer;
            break;
          case 4:
            register[1] ^= register[2];
            break;
          case 5:
            output.push(Number(combo % 8n));
            break;
          case 6:
            register[1] = register[0] / 2n ** combo;
            break;
          case 7:
            register[2] = register[0] / 2n ** combo;
            break;
        }
      }

      return output.join(',');
    };

    if (!find) {
      return loop([BigInt(a), BigInt(b), BigInt(c)]);
    }

    const target = program.join(',');
    let result = 0n;

    for (let i = program.length - 1; i >= 0; i--) {
      result <<= 3n;

      while (!target.endsWith(loop([result, BigInt(b), BigInt(c)]))) {
        result++;
      }
    }

    return Number(result);
  };
}

await run(readText, [execute(false), execute(true)]);
