export default function GenZero(props) {
  let mainArray = [];
  let probability;

  if (props.cellsAmount === "low") {
    probability = 0.1;
  } else if (props.cellsAmount === "medium") {
    probability = 0.3;
  } else if (props.cellsAmount === "large") {
    probability = 0.5;
  }

  for (let i = 0; i < props.size; i++) {
    let row = [];
    for (let k = 0; k < props.size; k++) {
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
