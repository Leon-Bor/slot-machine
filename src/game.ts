import { Application, Loader, Sprite } from "pixi.js";
import { Reels } from "./reels";

export const SLOT_WIDTH = 800;
export const SLOT_HEIGHT = 400;

export const SLOT_ROLL_TIME = 1000;
export const SLOT_ROLL_DELAY = 500;
export const SLOT_ROLL_DELAY_VARIANCE = 500;

export const SLOT_REEL_COUNT = 5;
export const SLOT_ICONS_PER_REEL_COUNT = 3;
export const SLOT_ICON_COUNT = 7;

export const REEL_ICON_HEIGHT = SLOT_HEIGHT / SLOT_ICONS_PER_REEL_COUNT;
export const REEL_ICON_WIDTH = SLOT_WIDTH / SLOT_REEL_COUNT;

export class Game {
  private app: Application;

  public constructor() {
    this.app = new Application({
      width: SLOT_WIDTH,
      height: SLOT_HEIGHT,
    });

    new Reels(this.app.stage);

    document.body.appendChild(this.app.view);
  }
}
