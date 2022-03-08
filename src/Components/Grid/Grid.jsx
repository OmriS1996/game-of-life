import "./Grid.css";
import GenZero from "../Engine/GenZero";

export default function Grid(props) {
  let temp2DArray = [
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  ];

  temp2DArray = GenZero(props.gameRules);
  return (
    <table className="grid">
      <tbody>
        {temp2DArray.map((y, indexY) => (
          <tr className="row">
            {y.map((x, indexX) => (
              <td className="item" key={`${indexX},${indexY}`}>
                {x}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
