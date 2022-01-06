import { Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import {
  REEL_WIDTH,
  SLOT_HEIGHT,
  SLOT_MARGIN_LEFT_RIGHT,
  SLOT_MARGIN_TOP_BOTTOM,
  SLOT_REEL_COUNT,
  SLOT_WIDTH,
} from "./game";
import { fakeApi } from "./helper";
import { Reel } from "./reel";

export class Slot extends Container {
  reels: Reel[];
  isSpinning = false;

  constructor(public container: Container) {
    super();

    this.x = SLOT_MARGIN_LEFT_RIGHT / 2;
    this.y = SLOT_MARGIN_TOP_BOTTOM / 2;

    this.reels = [];
    for (let i = 0; i < SLOT_REEL_COUNT; i++) {
      const reel = new Reel(i);
      reel.x = i * REEL_WIDTH;
      reel.y = 0;
      reel.width = REEL_WIDTH;
      this.reels.push(reel);
      this.addChild(reel);
    }

    this.setSlotMask();

    this.container.addChild(this);
  }

  setSlotMask() {
    const graphics = new Graphics();
    graphics.beginFill(0xff3300);
    graphics.drawRect(
      SLOT_MARGIN_LEFT_RIGHT / 2,
      SLOT_MARGIN_TOP_BOTTOM / 2,
      SLOT_WIDTH,
      SLOT_HEIGHT
    );
    graphics.endFill();

    this.mask = graphics;
  }

  async spin() {
    if (this.isSpinning) {
      return Promise.reject("Slot is already spinning");
    }

    this.isSpinning = true;

    const spins: Array<Promise<Array<number>>> = [];
    const spinMatrix: Array<Array<number>> = await fakeApi.call();
    console.log("spinMatrix", spinMatrix);

    this.reels.map((reel, i) => {
      spins.push(reel.spin(spinMatrix[i]));
    });

    const result = await Promise.all(spins);

    console.log("Slot spin done", result);
    this.isSpinning = false;
  }
}
