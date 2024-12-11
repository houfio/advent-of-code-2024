import { readNumberGrid, run } from '../utils.ts';

function calculateSafe(dampener: boolean) {
  return (input: number[][]) => {
    const isSafe = (data: number[]) => {
      let increasing = true;
      let decreasing = true;
      let jump = true;

      for (let i = 1; i < data.length; i++) {
        const current = data[i];
        const previous = data[i - 1];

        increasing &&= current > previous;
        decreasing &&= current < previous;
        jump &&= Math.abs(current - previous) < 4;

        if ((!increasing && !decreasing) || !jump) {
          return false;
        }
      }

      return true;
    };

    const filtered = input.filter((data) => {
      if (isSafe(data)) {
        return true;
      }

      for (let i = 0; i < data.length; i++) {
        const sliced = [...data.slice(0, i), ...data.slice(i + 1, data.length)];

        if (isSafe(sliced) && dampener) {
          return true;
        }
      }

      return false;
    });

    return filtered.length;
  };
}

await run(() => readNumberGrid(' '), [calculateSafe(false), calculateSafe(true)]);
