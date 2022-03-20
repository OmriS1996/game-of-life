import ConwayRules from "./ConwayRules";
export default function Spontaneous(currentStatus, neighborsValue) {
  currentStatus = ConwayRules(currentStatus, neighborsValue);
  if (currentStatus === 0 && Math.random() >= 0.5) {
    currentStatus = 1;
  }
  return currentStatus;
}
