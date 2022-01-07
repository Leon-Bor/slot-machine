import { Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import {
  REEL_WIDTH,
  SLOT_HEIGHT,
  SLOT_ICONS_PER_REEL_COUNT,
  SLOT_MARGIN_LEFT_RIGHT,
  SLOT_MARGIN_TOP_BOTTOM,
  SLOT_REEL_COUNT,
  SLOT_WIDTH,
} from "./game";
import { fakeApi } from "./helper";
import { Reel } from "./reel";
import { Interface } from "./interface";
import { WinLines } from "./win-lines";

export type Controls = {
  spin: Function;
};
export class Slot extends Container {
  interface: Interface;
  winLines: WinLines;
  reels: Reel[];
  isSpinning = false;
  credits = 1000;
  creditInput = 100;
  autoSpin = false;

  constructor(public container: Container) {
    super();

    this.x = SLOT_MARGIN_LEFT_RIGHT / 2;
    this.y = SLOT_MARGIN_TOP_BOTTOM / 2;

    this.reels = [];
    for (let i = 0; i < SLOT_REEL_COUNT; i++) {
      this.addReel(i);
    }
    this.winLines = new WinLines(this);

    // todo: use event emitter for interfce communication
    this.interface = new Interface(container, this, {
      spin: this.spin.bind(this),
    });
    this.interface.setCredits(this.credits);

    this.setSlotMask();
    this.container.addChild(this);
  }

  addReel(i: number) {
    // add bg
    const texture = Texture.from("reel");
    const sprite = new Sprite(texture);
    sprite.height = REEL_WIDTH * SLOT_ICONS_PER_REEL_COUNT;
    sprite.width = REEL_WIDTH - 8;
    sprite.x = i * REEL_WIDTH + 4;
    sprite.y = 0;
    this.addChild(sprite);

    // add reel
    const reel = new Reel(i);
    reel.x = i * REEL_WIDTH;
    reel.y = 0;
    reel.width = REEL_WIDTH;
    this.reels.push(reel);
    this.addChild(reel);
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

    this.winLines.clear();
    const payAmount = await this.payCredits(this.creditInput);

    this.isSpinning = true;
    this.interface.onSpinStart();

    // fake api call
    const spins: Array<Promise<Array<number>>> = [];
    const { matrix, win, winAmount, winLines } = await fakeApi.call(payAmount);

    // spin all reels
    this.reels.map((reel, i) => {
      spins.push(reel.spin(matrix[i]));
    });
    await Promise.all(spins);

    // show win and get credits
    if (win) {
      this.winLines.drawWinLines(winLines);
      this.receiveCredits(winAmount);
      this.interface.showWinAmount(winAmount);

      console.log(`You have won: ${winAmount} credits`);
    }

    console.log(`Slot spin done. Money left: ${this.credits}`);
    this.isSpinning = false;
    this.interface.onSpinDone();

    if (this.credits < this.creditInput) {
      this.interface.showNoCreditsMessage();
    }

    // todo: add auto spin
    if (this.autoSpin) {
      setTimeout(
        () => {
          this.spin();
        },
        win ? 1000 : 100
      );
    }
  }

  async payCredits(amount: number) {
    if (this.credits < amount) {
      return Promise.reject("Not enough credits");
    }
    this.credits -= amount;
    this.interface.setCredits(this.credits);

    return amount;
  }

  async receiveCredits(amount: number) {
    this.credits += amount;
    this.interface.setCredits(this.credits);
  }
}
