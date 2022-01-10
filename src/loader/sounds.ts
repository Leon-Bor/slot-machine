import { Howl, Howler } from "howler";

// Setup the new Howl.
export const sounds = {
  theme: () => {
    new Howl({
      src: ["sounds/theme.mp3"],
      volume: 0.2,
      loop: true,
    }).play();
  },
  win: () => {
    new Howl({
      src: ["sounds/win.mp3"],
      volume: 0.5,
    }).play();
  },
  reelSpinEnd: () => {
    new Howl({
      src: ["sounds/reel-spin-end.mp3"],
      volume: 5,
    }).play();
  },
  gameover: () => {
    new Howl({
      src: ["sounds/gameover.mp3"],
      volume: 0.7,
    }).play();
  },
};
