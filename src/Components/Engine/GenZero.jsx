export default function GenZero(rulesObject) {
  let mainArray = [];
  let probability;

  if (rulesObject.cellsAmount === "low") {
    probability = 0.1;
  } else if (rulesObject.cellsAmount === "medium") {
    probability = 0.3;
  } else if (rulesObject.cellsAmount === "large") {
    probability = 0.5;
  }

  for (let i = 0; i < rulesObject.size; i++) {
    let row = [];
    for (let k = 0; k < rulesObject.size; k++) {
      if (Math.random() <= probability) {
        row[k] = 1;
      } else {
        row[k] = 0;
      }
    }
    mainArray[i] = row;
  }
  return mainArray;
}
