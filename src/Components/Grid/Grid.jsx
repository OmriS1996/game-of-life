import "./Grid.css";
import GenZero from "../Engine/GenZero";
import ConwayRules from "../Engine/Conway Rules/ConwayRules";
import { useEffect, useState } from "react";

export default function Grid(props) {
  const [mainArray, setMainArray] = useState([[]]);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    if (mainArray.length <= 1) {
      let temp2DArray = [[]];
      let tempGeneration = 0;
      temp2DArray = GenZero(props.gameRules);
      setMainArray(temp2DArray);
      setInterval(() => {
        temp2DArray = ConwayRules(temp2DArray);
        setMainArray(temp2DArray);
        setGeneration(tempGeneration++);
      }, 500);
    }
  });

  return (
    <>
      <div>{mainArray}</div>
      <table className="grid">
        <tbody>
          {mainArray.map((y, indexY) => (
            <tr className="row">
              {y.map((x, indexX) => (
                <td
                  className="item"
                  key={`${indexX},${indexY}`}
                  style={
                    x === 1
                      ? { color: "blue", backgroundColor: "blue" }
                      : { color: "grey", backgroundColor: "grey" }
                  }
                >
                  {x}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
