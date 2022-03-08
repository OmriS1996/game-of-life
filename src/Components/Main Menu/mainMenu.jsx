import { useEffect, useState } from "react";

export default function MainMenu(props) {
  const [size, setSize] = useState("10");
  const [cellsAmount, setCellsAmount] = useState("medium");
  const [speed, setSpeed] = useState("normal");
  const [rules, setRules] = useState("conway");
  const [activeWalls, setActiveWalls] = useState(false);

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

  function handleActiveWalls(e) {
    setActiveWalls(!activeWalls);
  }

  function handleStart() {
    let userChoice = {
      size: size,
      cellsAmount: cellsAmount,
      speed: speed,
      rules: rules,
      activeWalls: activeWalls,
      gameStart: true,
    };
    props.setGameRules(userChoice);
  }

  return (
    <div className="mainMenu">
      <div>
        <label for="gridSize">Grid size:</label>

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
        <label for="amountOfCells">Starting amount of cells:</label>

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
        <label for="speed">Evolution speed:</label>

        <select name="speed" value={speed} onChange={handleSpeed}>
          <option value="verySlow">Very Slow</option>
          <option value="slow">Slow</option>

          <option value="normal">Normal</option>
          <option value="fast">Fast</option>
          <option value="veryFast">Very fast</option>
        </select>
      </div>
      <div>
        <label for="rules">Ruleset:</label>

        <select name="rules" value={rules} onChange={handleRules}>
          <option value="conway">Conway (Original)</option>
          <option value="hyperactive">Hyperactive</option>

          <option value="highLife">High Life</option>
          <option value="spontanous">Spontanous</option>
        </select>
      </div>
      <div>
        <label for="activeWalls">Active walls?</label>
        <input
          type="checkbox"
          name="activeWalls"
          value={activeWalls}
          onChange={handleActiveWalls}
        />
      </div>
      <div>
        <button onClick={handleStart}>Start Game</button>
      </div>
    </div>
  );
}
