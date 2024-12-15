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

      return data.some((_, i) => safe([...data.slice(0, i), ...data.slice(i + 1)]));
    });

    return filtered.length;
  };
}

await run(() => readNumberGrid(' '), [countSafe(false), countSafe(true)]);
