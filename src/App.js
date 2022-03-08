import { useState } from "react";
import "./App.css";
import MainMenu from "./Components/Main Menu/mainMenu";
import Grid from "./Components/Grid/Grid";

function App() {
  const [gameRules, setGameRules] = useState({ gameStart: false });

  return (
    <div className="App">
      {gameRules.gameStart ? (
        <Grid gameRules={gameRules} />
      ) : (
        <MainMenu setGameRules={setGameRules} />
      )}
    </div>
  );
}

export default App;
