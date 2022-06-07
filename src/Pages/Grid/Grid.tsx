import "./Grid.css";
import { Engine } from "../../Components/Engine/MainEngine/Engine";
import { useEffect, useRef, useState } from "react";

const engine: Engine = new Engine();

export default function Grid(props) {
  const [mainArray, setMainArray] = useState([[]]);
  const [generation, setGeneration] = useState(0);
  const [stableState, setStableState] = useState(false);
  const aliveClass = "alive";
  const deadClass = "dead";
  let interval = useRef(null);
  let temp2DArray = [[]];
  let arrayCheck = [];

  function stableStateCheck(array, generation) {
    arrayCheck.push(array);
    if (generation >= 3) {
      if (
        JSON.stringify(arrayCheck[0]) === JSON.stringify(arrayCheck[1]) ||
        JSON.stringify(arrayCheck[0]) === JSON.stringify(arrayCheck[2])
      ) {
        setStableState(true);
      } else {
        setStableState(false);
      }
      arrayCheck.shift();
    }
  }

  function changeStatus(row, column) {
    engine.changeStatus(row, column);
    temp2DArray = engine.showGrid();
    setMainArray(temp2DArray);
  }

  function returnToMenu() {
    clearInterval(interval.current);
    props.setGameRules({ gameStart: false });
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let tempGeneration = 0;
      engine.initialize(
        props.gameRules.cellsAmount,
        props.gameRules.size,
        props.gameRules.rules
      );
      temp2DArray = engine.showGrid();
      setMainArray(temp2DArray);
      setGeneration(tempGeneration++);
      interval.current = setInterval(() => {
        engine.fullIteration();
        temp2DArray = engine.showGrid();
        stableStateCheck(temp2DArray, tempGeneration);
        setMainArray(temp2DArray);
        setGeneration(tempGeneration++);
      }, props.gameRules.speed);
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="grid">
          {mainArray.map((y, indexY) => (
            <div className="row" key={`${indexY}`}>
              {y.map((x, indexX) => (
                <div
                  onClick={() => changeStatus(indexY, indexX)}
                  className={x === 1 ? aliveClass : deadClass}
                  key={`${indexX},${indexY}`}
                ></div>
              ))}
            </div>
          ))}
        </div>

        <div className="gameInfo">
          <div>Generation: {generation}</div>
          <button onClick={returnToMenu}>Return To Main Menu</button>
          <div>{stableState ? "stable" : "running"}</div>
        </div>
      </div>
    </>
  );
}
