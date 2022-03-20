import "./Grid.css";
import GenZero from "../Engine/GenZero";
import MainEngine from "../Engine/MainEngine/MainEngine";
import ConwayRules from "../Engine/Rules/ConwayRules";
import HyperactiveRules from "../Engine/Rules/HyperactiveRules";
import Spontaneous from "../Engine/Rules/Spontaneous";
import { useEffect, useRef, useState } from "react";

export default function Grid(props) {
  const [mainArray, setMainArray] = useState([[]]);
  const [generation, setGeneration] = useState(0);
  const [stableState, setStableState] = useState(false);
  const aliveClass = "alive";
  const deadClass = "dead";
  let interval = useRef(null);
  let temp2DArray = [[]];
  let arrayCheck = [];

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
      return ConwayRules;
    } else if (ruleset === "hyperactive") {
      return HyperactiveRules;
    } else if (ruleset === "spontaneous") {
      return Spontaneous;
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
      let ruleSet = ruleSwitch(props.gameRules.rules);
      temp2DArray = GenZero(props.gameRules);
      setMainArray(temp2DArray);
      setGeneration(tempGeneration++);
      interval.current = setInterval(() => {
        temp2DArray = MainEngine(temp2DArray, ruleSet);
        stableStateCheck(temp2DArray, tempGeneration);
        setMainArray(temp2DArray);
        setGeneration(tempGeneration++);
      }, speed);
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  function changeStatus(row, item) {
    temp2DArray = mainArray;
    if (temp2DArray[row][item] === 1) {
      temp2DArray[row][item] = 0;
    } else if (temp2DArray[row][item] === 0) {
      temp2DArray[row][item] = 1;
    }
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
