export default function ConwayRules(array) {
  let nextArray = [];

  for (let i = 0; i < array.length; i++) {
    for (let k = 0; k < array[i].length; k++) {
      let value =
        array[(i - 1, k - 1)] +
        array[(i - 1, k)] +
        array[(i - 1, k + 1)] +
        array[(i, k - 1)] +
        array[(i, k + 1)] +
        array[(i + 1, k - 1)] +
        array[(i + 1, k)] +
        array[(i + 1, k + 1)];
      if (array[(i, k)] === 1 && value > 2 && value < 3) {
        nextArray[(i, k)] = 1;
      } else if (array[(i, k)] === 0 && value === 3) {
        nextArray[(i, k)] = 1;
      } else {
        nextArray[(i, k)] = 0;
      }
    }
  }

  return nextArray;
}
