import { RuleSet } from "./Engine";

type UserOptions = {
  size: string;
  cellsAmount: "low" | "medium" | "large";
  speed: "verySlow" | "slow" | "normal" | "fast" | "veryFast";
  rules: "conway" | "hyperactive" | "spontaneous";
  gameStart: boolean;
};

type OptionsOutput = {
  size: number;
  cellsAmount: 0.1 | 0.3 | 0.5;
  speed: number;
  rules: RuleSet;
  gameStart: boolean;
};

export class OptionsParser {
  private probabilty(probabilityString: string): 0.1 | 0.3 | 0.5 {
    let probabilityNum: 0.1 | 0.3 | 0.5;
    if (probabilityString === "low") {
      probabilityNum = 0.1;
    } else if (probabilityString === "medium") {
      probabilityNum = 0.3;
    } else if (probabilityString === "large") {
      probabilityNum = 0.5;
    }

    return probabilityNum;
  }

  private gameSpeed(speed: string): number {
    let speedNum: number;
    if (speed === "verySlow") {
      speedNum = 2000;
    } else if (speed === "slow") {
      speedNum = 1000;
    } else if (speed === "normal") {
      speedNum = 500;
    } else if (speed === "fast") {
      speedNum = 200;
    } else if (speed === "veryFast") {
      speedNum = 0;
    }
    return speedNum;
  }

  private ruleSwitch(ruleset) {
    if (ruleset === "conway") {
      return RuleSet.Conway;
    } else if (ruleset === "hyperactive") {
      return RuleSet.Hyperactive;
    } else if (ruleset === "spontaneous") {
      return RuleSet.Spontaneous;
    }
  }

  public parse(userOptions: UserOptions): OptionsOutput {
    const optionsOutput: OptionsOutput = {
      size: parseInt(userOptions.size),
      cellsAmount: this.probabilty(userOptions.cellsAmount),
      speed: this.gameSpeed(userOptions.speed),
      rules: this.ruleSwitch(userOptions.rules),
      gameStart: userOptions.gameStart,
    };

    return optionsOutput;
  }
}
