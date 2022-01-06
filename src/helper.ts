import {
  SLOT_ICONS_PER_REEL_COUNT,
  SLOT_ICON_COUNT,
  SLOT_REEL_COUNT,
} from "./game";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const fakeApi = {
  call: () => {
    return new Promise((resolve, reject) => {
      const randMatrix = new Array(SLOT_REEL_COUNT).fill(0).map(() => {
        return new Array(SLOT_ICONS_PER_REEL_COUNT).fill(0).map(() => {
          // simple higher chance for 7
          const chance = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7];
          const rand = chance[Math.floor(Math.random() * chance.length)];

          return rand;
        });
      });
      console.log("randMatrix", randMatrix);
      setTimeout(() => {
        resolve(randMatrix);
      }, 50);
    }) as any;
  },
};
