import { Application, Loader, Sprite } from "pixi.js";
import { Slot } from "./slot";
import { Assets } from "../loader/assets";

export const SLOT_WIDTH = 720;
export const SLOT_HEIGHT = 300;

export const SLOT_MARGIN_TOP_BOTTOM = 200;
export const SLOT_MARGIN_LEFT_RIGHT = 100;

export const SLOT_ROLL_TIME = 1000;
export const SLOT_ROLL_DELAY = 300;
export const SLOT_ROLL_DELAY_VARIANCE = 200;

export const SLOT_SPIN_SPEED = 40;

export const SLOT_REEL_COUNT = 5;
export const SLOT_ICONS_PER_REEL_COUNT = 3;
export const SLOT_ICON_COUNT = 7;

export const REEL_ICON_HEIGHT = SLOT_HEIGHT / SLOT_ICONS_PER_REEL_COUNT;
export const REEL_ICON_WIDTH = SLOT_WIDTH / SLOT_REEL_COUNT;
export const REEL_WIDTH = SLOT_WIDTH / SLOT_REEL_COUNT;

export class Game {
  private app: Application;
  private slot?: Slot;
  private assets: Loader;

  public constructor(private onLoaded: Function) {
    this.app = new Application({
      width: SLOT_WIDTH + SLOT_MARGIN_LEFT_RIGHT,
      height: SLOT_HEIGHT + SLOT_MARGIN_TOP_BOTTOM,
      preserveDrawingBuffer: true,
    });

    this.assets = new Assets();
    this.assets.onComplete.add(() => {
      this.init();
      onLoaded();
    });
  }

  init() {
    this.keybinds();
    this.slot = new Slot(this.app.stage);
    document.body.appendChild(this.app.view);

    // ? for debug only
    this.app.renderer.plugins.interaction.on("pointerup", (e: any) => {
      const x = e.data.global.x;
      const y = e.data.global.y;
      console.log("Click Postion:", x, y);
    });
  }

  async spin() {
    if (this.slot) {
      await this.slot.spin();
    }
  }

  keybinds() {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode == 32) {
        this.spin();
        event.preventDefault();
      }
    });
  }
}
