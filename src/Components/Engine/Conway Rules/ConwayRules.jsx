export default function ConwayRules(array) {
  console.log(array);
  let nextArray = [];

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
          if (x !== i && y !== k) {
            value += array[x][y];
          }
        }
      }

      if (array[i][k] === 1 && value >= 2 && value <= 3) {
        nextArray[i][k] = 1;
      } else if (array[i][k] === 0 && value === 3) {
        nextArray[i][k] = 1;
      } else {
        nextArray[i][k] = 0;
      }
    }
  }

  return nextArray;
}
