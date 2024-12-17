import { mod, readLines, run } from '../utils.ts';

type Register = [number, number, number];
type Fn = (value: number) => void;
type InstructionInput = { literal: number; combo: number; register: Register; jump: Fn; output: Fn };
type Instruction = (input: InstructionInput) => void;

const instructions: Record<number, Instruction> = {
  0: ({ combo, register }) => {
    register[0] = Math.floor(register[0] / 2 ** combo);
  },
  1: ({ literal, register }) => {
    register[1] = register[1] ^ literal;
  },
  2: ({ combo, register }) => {
    register[1] = mod(combo, 8);
  },
  3: ({ literal, register, jump }) => {
    if (register[0]) {
      jump(literal);
    }
  },
  4: ({ register }) => {
    register[1] = register[1] ^ register[2];
  },
  5: ({ combo, output }) => {
    output(mod(combo, 8));
  },
  6: ({ combo, register }) => {
    register[1] = Math.floor(register[0] / 2 ** combo);
  },
  7: ({ combo, register }) => {
    register[2] = Math.floor(register[0] / 2 ** combo);
  }
};

function execute(input: string[]) {
  const numbers = input.filter(Boolean).flatMap((line) =>
    line
      .slice(line.indexOf(':') + 2)
      .split(',')
      .map(Number)
  );
  const register = numbers.slice(0, 3) as Register;
  const program = numbers.slice(3);
  const output: number[] = [];
  let pointer = 0;

  while (pointer < program.length) {
    const instruction = instructions[program[pointer]];
    const literal = program[pointer + 1];
    const combo = literal > 3 ? (literal > 6 ? -1 : register[literal - 4]) : literal;
    let jumped = false;

    instruction({
      literal,
      combo,
      register,
      jump: (value) => {
        pointer = value;
        jumped = true;
      },
      output: (value) => {
        output.push(value);
      }
    });

    if (!jumped) {
      pointer += 2;
    }
  }

  return output.join(',');
}

await run(readLines, [execute]);
