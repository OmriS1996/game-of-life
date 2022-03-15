import "./Grid.css";
import GenZero from "../Engine/GenZero";
import ConwayRules from "../Engine/Conway Rules/ConwayRules";
import { useEffect, useState } from "react";

export default function Grid(props) {
  const [mainArray, setMainArray] = useState([[]]);

  useEffect(() => {
    if (mainArray.length <= 1) {
      let temp2DArray = [[]];
      temp2DArray = GenZero(props.gameRules);
      console.log(temp2DArray);
      setMainArray(temp2DArray);
      //ConwayRules(temp2DArray);
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
