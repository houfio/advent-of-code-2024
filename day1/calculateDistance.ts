export function calculateDistance(left: number[], right: number[]) {
  if (left.length !== right.length) {
    throw new Error('Inputs must be the same length');
  }

  const leftSorted = left.toSorted();
  const rightSorted = right.toSorted();

  return leftSorted.reduce((previous, current, index) => previous + Math.abs(current - rightSorted[index]), 0);
}
