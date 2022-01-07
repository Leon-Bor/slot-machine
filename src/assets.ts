import { Loader } from "pixi.js";
import { SLOT_ICON_COUNT } from "./game";

export class Assets extends Loader {
  constructor() {
    super();

    this.baseUrl = "assets/";

    for (let index = 0; index < SLOT_ICON_COUNT; index++) {
      this.add((index + 1).toString(), `${index + 1}.png`);
    }

    this.add("bg", `bg.png`);
    this.add("logo", `logo.png`);
    this.add("reel", `reel.png`);
    this.add("button", `button.png`);
    this.add("button-pressed", `button-pressed.png`);

    this.onProgress.add((a) => {
      // todo: progress bar
    });

    this.onError.add((a) => {
      // todo: error handling
    });

    this.onComplete.add((a) => {
      console.log("assets loaded");
    });

    this.load();
  }
}
