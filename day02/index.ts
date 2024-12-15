import { readNumberGrid, run } from '../utils.ts';

function countSafe(dampener: boolean) {
  return (input: number[][]) => {
    const safe = (data: number[]) => {
      const positive = data[1] - data[0] > 0;

      return data.slice(1).every((value, index) => {
        const diff = value - data[index];
        const abs = Math.abs(diff);

        return diff > 0 === positive && abs > 0 && abs < 4;
      });
    };

    const filtered = input.filter((data) => {
      if (!dampener) {
        return safe(data);
      }

      for (let i = 0; i < data.length; i++) {
        const sliced = [...data.slice(0, i), ...data.slice(i + 1, data.length)];

        if (safe(sliced)) {
          return true;
        }
      }

      return false;
    });

    return filtered.length;
  };
}

await run(() => readNumberGrid(' '), [countSafe(false), countSafe(true)]);
