import { WebpackOptionsValidationError } from "webpack";
import {
  SLOT_ICONS_PER_REEL_COUNT,
  SLOT_ICON_COUNT,
  SLOT_REEL_COUNT,
} from "./container/game";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let chance = [1, 2, 3, 4, 5, 6, 7];
export const fakeApi = {
  call: async (payAmount: number) => {
    const matrix = new Array(SLOT_REEL_COUNT).fill(0).map(() => {
      return new Array(SLOT_ICONS_PER_REEL_COUNT).fill(0).map(() => {
        const rand = chance[Math.floor(Math.random() * chance.length)];
        return rand;
      });
    });

    const lineMatches: { [key: string]: Array<number[]> } = {
      "2x2": [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      "3x1": [[0, 0, 0]],
      "3x3": [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
      ],
      "3x4": [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ],
      "5x3": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 2, 2],
        [1, 1, 1, 1, 1],
        [2, 2, 1, 0, 0],
        [2, 2, 2, 2, 2],
        [0, 1, 2, 1, 0],
        [2, 1, 0, 1, 2],
      ],
      // todo: add more
    };

    if (!lineMatches[`${SLOT_REEL_COUNT}x${SLOT_ICONS_PER_REEL_COUNT}`]) {
      return Promise.reject(
        `No winning lines found for ${SLOT_REEL_COUNT}x${SLOT_ICONS_PER_REEL_COUNT}`
      );
    }

    // winning lines for 3x5
    const lines =
      lineMatches[`${SLOT_REEL_COUNT}x${SLOT_ICONS_PER_REEL_COUNT}`];

    console.log("chances on", chance.join(", "));

    // find winning lines
    const winLines: Array<number[]> = [];
    const rotatedMatrix = rotateMatrixLeft(matrix);
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      const firstIcon = rotatedMatrix[line[0]][0];

      const isWin = line.every((nr, index) => {
        return rotatedMatrix[nr][index] === firstIcon;
      });

      if (isWin) {
        winLines.push(line);
      }
    }

    // hihger chance with each spin on 7
    if (winLines.length) {
      chance = new Array(SLOT_ICON_COUNT).fill(0).map((n, i) => i + 1);
    } else {
      chance.push(7);
    }

    // fake request delay time
    await timeout(100);
    return {
      matrix,
      win: !!winLines.length,
      winLines,
      winAmount: winLines.reduce((cur, line) => {
        console.log(line);
        const firstIcon = rotatedMatrix[line[0]][0];
        return cur + firstIcon * payAmount * 0.9;
      }, 0),
    };
  },
};

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function rotateMatrixLeft(matrix: number[][]) {
  return matrix[0]
    .map((val, index) => matrix.map((row) => row[index]))
    .reverse();
}

export function rotateMatrixRight(matrix: number[][]) {
  return matrix[0].map((val, index) =>
    matrix.map((row) => row[index]).reverse()
  );
}
