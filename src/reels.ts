import { Container, Sprite, Texture } from "pixi.js";
import { SLOT_REEL_COUNT, SLOT_WIDTH } from "./game";
import { Reel } from "./reel";

export class Reels extends Container {
  reels: any[];

  constructor(public container: Container) {
    super();

    this.reels = [];
    for (let i = 0; i < SLOT_REEL_COUNT; i++) {
      //   const texture = Texture.from("assets/1.png");
      const reel = new Reel(container);
      reel.x = i * (SLOT_WIDTH / SLOT_REEL_COUNT);
      reel.y = 0;
      this.reels.push(reel);
      container.addChild(reel);
    }
  }
}
