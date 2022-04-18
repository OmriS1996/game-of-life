type Probability = 0.1 | 0.3 | 0.5;

export class Engine {
  private probability: Probability;
  private size: number;
  private grid: number[][];
  constructor(probability: Probability, size: number) {
    this.probability = probability;
    this.size = size;
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
}
