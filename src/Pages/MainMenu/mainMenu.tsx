import { useState } from "react";
import { OptionsParser } from "../../Components/Engine/MainEngine/OptionsParser";

export default function MainMenu(props) {
  const [size, setSize] = useState("10");
  const [cellsAmount, setCellsAmount] = useState<"low" | "medium" | "large">(
    "medium"
  );
  const [speed, setSpeed] = useState<
    "verySlow" | "slow" | "normal" | "fast" | "veryFast"
  >("normal");
  const [rules, setRules] = useState<"conway" | "hyperactive" | "spontaneous">(
    "conway"
  );

  function handleSize(e) {
    setSize(e.target.value);
  }

  function handleCellsAmount(e) {
    setCellsAmount(e.target.value);
  }

  function handleSpeed(e) {
    setSpeed(e.target.value);
  }

  function handleRules(e) {
    setRules(e.target.value);
  }

  function handleStart() {
    let userChoiceRaw = {
      size: size,
      cellsAmount: cellsAmount,
      speed: speed,
      rules: rules,
      gameStart: true,
    };

    let optionsParser = new OptionsParser();
    let userChoice = optionsParser.parse(userChoiceRaw);

    props.setGameRules(userChoice);
  }

  return (
    <div className="mainMenu">
      <div>
        <label htmlFor="gridSize">Grid size:</label>

        <select name="gridSize" value={size} onChange={handleSize}>
          <option value="6">6 x 6</option>
          <option value="8">8 x 8</option>
          <option value="10">10 x 10</option>
          <option value="15">15 x 15</option>
          <option value="20">20 x 20</option>
          <option value="30">30 x 30</option>
          <option value="50">50 x 50</option>
          <option value="75">75 x 75</option>
          <option value="100">100 x 100</option>
        </select>
      </div>
      <div>
        <label htmlFor="amountOfCells">Starting amount of cells:</label>

        <select
          name="amountOfCells"
          value={cellsAmount}
          onChange={handleCellsAmount}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div>
        <label htmlFor="speed">Evolution speed:</label>

        <select name="speed" value={speed} onChange={handleSpeed}>
          <option value="verySlow">Very Slow</option>
          <option value="slow">Slow</option>

          <option value="normal">Normal</option>
          <option value="fast">Fast</option>
          <option value="veryFast">Very fast</option>
        </select>
      </div>
      <div>
        <label htmlFor="rules">Ruleset:</label>

        <select name="rules" value={rules} onChange={handleRules}>
          <option value="conway">Conway (Original)</option>
          <option value="hyperactive">Hyperactive</option>
          <option value="spontaneous">Spontaneous</option>
        </select>
      </div>
      <div>
        <button onClick={handleStart}>Start Game</button>
      </div>
    </div>
  );
}
