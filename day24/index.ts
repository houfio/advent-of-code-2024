import { readLines, run } from '../utils.ts';

export function simulate(input: string[]) {
  const halfway = input.indexOf('');
  const inputs = input.slice(0, halfway).reduce<Record<string, number>>((previous, current) => {
    const split = current.split(': ');

    previous[split[0]] = Number(split[1]);

    return previous;
  }, {});
  const gates = input.slice(halfway + 1).map((line) => line.split(/ (?:-> )?/));
  const executed = new Set<number>();

  const execute = (gate: number) => {
    if (executed.has(gate)) {
      return;
    }

    const [in1, operation, in2, out] = gates[gate];

    if (inputs[in1] === undefined || inputs[in2] === undefined) {
      return;
    }

    executed.add(gate);

    const val1 = inputs[in1];
    const val2 = inputs[in2];

    inputs[out] = operation === 'AND' ? val1 & val2 : operation === 'OR' ? val1 | val2 : val1 ^ val2;

    for (let i = 0; i < gates.length; i++) {
      const [i1, , i2] = gates[i];

      if (i1 === out || i2 === out) {
        execute(i);
      }
    }
  };

  for (let i = 0; i < gates.length; i++) {
    execute(i);
  }

  return Number.parseInt(
    Object.keys(inputs)
      .filter((key) => key.startsWith('z'))
      .toSorted((a, b) => b.localeCompare(a))
      .map((key) => inputs[key])
      .join(''),
    2
  );
}

await run(readLines, [simulate]);
