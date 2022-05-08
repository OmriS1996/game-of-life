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

  function probabilty(probabilityString) {
    let probabilityNum;
    if (probabilityString === "low") {
      probabilityNum = 0.1;
    } else if (probabilityString === "medium") {
      probabilityNum = 0.3;
    } else if (probabilityString === "large") {
      probabilityNum = 0.5;
    }

    return probabilityNum;
  }

  function gameSpeed(speed) {
    if (speed === "verySlow") {
      speed = 2000;
    } else if (speed === "slow") {
      speed = 1000;
    } else if (speed === "normal") {
      speed = 500;
    } else if (speed === "fast") {
      speed = 200;
    } else if (speed === "veryFast") {
      speed = 0;
    }
    return speed;
  }

  function ruleSwitch(ruleset) {
    if (ruleset === "conway") {
      return 0;
    } else if (ruleset === "hyperactive") {
      return 1;
    } else if (ruleset === "spontaneous") {
      return 2;
    }
  }

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

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let tempGeneration = 0;
      let speed = gameSpeed(props.gameRules.speed);

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
        console.log(temp2DArray);
        stableStateCheck(temp2DArray, tempGeneration);
        setMainArray(temp2DArray);
        setGeneration(tempGeneration++);
      }, props.gameRules.speed);
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  function changeStatus(row, column) {
    engine.changeStatus(row, column);
    temp2DArray = engine.showGrid();
    setMainArray(temp2DArray);
  }

  function returnToMenu() {
    clearInterval(interval.current);
    props.setGameRules({ gameStart: false });
  }

  return (
    <>
      <div>
        <table className="grid">
          <tbody>
            {mainArray.map((y, indexY) => (
              <tr className="row" key={`${indexY}`}>
                {y.map((x, indexX) => (
                  <td
                    onClick={() => changeStatus(indexY, indexX)}
                    className={x === 1 ? aliveClass : deadClass}
                    key={`${indexX},${indexY}`}
                  >
                    {x}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>Generation: {generation}</div>
        <button onClick={returnToMenu}>Return To Main Menu</button>
        <div>{stableState ? "stable" : "running"}</div>
      </div>
    </>
  );
}
