import { useState } from "react";
import "./App.css";
import MainMenu from "./Pages/MainMenu/mainMenu";
import Grid from "./Pages/Grid/Grid";

function App() {
  const [gameRules, setGameRules] = useState({ gameStart: false });

  return (
    <div className="App">
      {gameRules.gameStart ? (
        <Grid setGameRules={setGameRules} gameRules={gameRules} />
      ) : (
        <MainMenu setGameRules={setGameRules} />
      )}
    </div>
  );
}

export default App;
