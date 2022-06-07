import conwayRules from "../Rules/ConwayRules";
import hyperActiveRules from "../Rules/HyperactiveRules";
import spontaneous from "../Rules/Spontaneous";

type Probability = 0.1 | 0.3 | 0.5;
type RuleSetFunction = (cellValue: number, neighbourValue: number) => number;
export enum RuleSet {
  Conway,
  Hyperactive,
  Spontaneous,
}

const ruleSetMap = {};
ruleSetMap[RuleSet.Conway] = conwayRules;
ruleSetMap[RuleSet.Hyperactive] = hyperActiveRules;
ruleSetMap[RuleSet.Spontaneous] = spontaneous;

export class Engine {
  private probability: Probability;
  private size: number;
  private grid: number[][];
  private ruleSetFunction: RuleSetFunction;
  public initialize(probability: Probability, size: number, ruleSet: RuleSet) {
    this.probability = probability;
    this.size = size;
    this.ruleSetFunction = ruleSetMap[ruleSet];
    this.initializeGrid();
  }

  private initializeGrid(): void {
    this.grid = [];
    for (let i: number = 0; i < this.size; i++) {
      let row: number[] = [];
      for (let k: number = 0; k < this.size; k++) {
        if (Math.random() <= this.probability) {
          row[k] = 1;
        } else {
          row[k] = 0;
        }
      }
      this.grid[i] = row;
    }
  }

  public fullIteration(): void {
    let nextArray: number[][] = [[]];

    for (let i: number = 0; i < this.grid.length; i++) {
      for (let k: number = 0; k < this.grid[i].length; k++) {
        const value: number = this.calcNeighbours(i, k);
        if (nextArray[i] === undefined) {
          nextArray[i] = [];
        }
        nextArray[i][k] = this.calcCellNextValue(i, k, value);
      }
    }

    this.grid = nextArray;
  }

  private calcCellNextValue(
    row: number,
    column: number,
    neighbourValue: number
  ): number {
    const cellValue = this.grid[row][column];
    return this.ruleSetFunction(cellValue, neighbourValue);
  }

  private calcNeighbours(row: number, column: number): number {
    let value: number = 0;
    for (
      let x: number = Math.max(0, row - 1);
      x <= Math.min(row + 1, this.grid.length - 1);
      x++
    ) {
      for (
        let y: number = Math.max(0, column - 1);
        y <= Math.min(column + 1, this.grid.length - 1);
        y++
      ) {
        let isCurrentLocation: boolean = x === row && y === column;
        if (!isCurrentLocation) {
          value += this.grid[x][y];
        }
      }
    }
    return value;
  }

  public changeStatus(row: number, column: number): void {
    this.grid[row][column] = this.grid[row][column] === 0 ? 1 : 0;
  }

  public showGrid(): number[][] {
    const exposedGrid: number[][] = JSON.parse(JSON.stringify(this.grid));
    return exposedGrid;
  }
}
