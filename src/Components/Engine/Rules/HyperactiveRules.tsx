export default function HyperactiveRules(
  currentStatus: number,
  neighborsValue: number
): number {
  if (currentStatus === 1 && neighborsValue < 2 && neighborsValue > 5) {
    currentStatus = 1;
  } else if (currentStatus === 0 && neighborsValue === 3) {
    currentStatus = 1;
  } else {
    currentStatus = 0;
  }
  return currentStatus;
}
