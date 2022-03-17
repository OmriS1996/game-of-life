import ConwayRules from "../Conway Rules/ConwayRules";
import GenZero from "../GenZero";

export default function MainSwitch(gameSettings) {
  let array = GenZero(gameSettings);
  setInterval(() => {
    ConwayRules(array);
  }, 500);

  return array;
}
