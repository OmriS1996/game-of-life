export default function MainEngine(array, ruleSetFunction) {
  let nextArray = [[]];

  for (let i = 0; i < array.length; i++) {
    for (let k = 0; k < array[i].length; k++) {
      let value = 0;
      for (
        let x = Math.max(0, i - 1);
        x <= Math.min(i + 1, array.length - 1);
        x++
      ) {
        for (
          let y = Math.max(0, k - 1);
          y <= Math.min(k + 1, array.length - 1);
          y++
        ) {
          let isCurrentLocation = x === i && y === k;
          if (!isCurrentLocation) {
            value += array[x][y];
          }
        }
      }
      if (nextArray[i] === undefined) {
        nextArray[i] = [];
      }
      nextArray[i][k] = ruleSetFunction(array[i][k], value);
    }
  }

  return nextArray;
}
