import {
  Container,
  ObservablePoint,
  Point,
  Sprite,
  Texture,
  Ticker,
} from "pixi.js";
import { getRandomInt } from "../helper";
import {
  REEL_ICON_HEIGHT,
  REEL_ICON_WIDTH,
  SLOT_HEIGHT,
  SLOT_ICONS_PER_REEL_COUNT,
  SLOT_ICON_COUNT,
  SLOT_ROLL_DELAY,
  SLOT_ROLL_DELAY_VARIANCE,
  SLOT_ROLL_TIME,
  SLOT_SPIN_SPEED,
} from "./game";
import { randomInt } from "crypto";

export class Reel extends Container {
  icons: Sprite[] = [];
  isSpinning: boolean = false;
  ticker = new Ticker();
  animation?: any;
  bounceAnmation?: any;
  finalIcons: Number[] = [];

  constructor(public reelIndex: number) {
    super();

    // first init reels
    this.prepareNextSpin(
      new Array(SLOT_ICONS_PER_REEL_COUNT)
        .fill(0)
        .map(() => getRandomInt(1, SLOT_ICON_COUNT + 1))
    );
  }

  addIcon(iconName: number | string, startPosition = 0) {
    const texture = Texture.from(iconName + "");
    const icon = new Sprite(texture);
    icon.height = REEL_ICON_HEIGHT;
    icon.width = REEL_ICON_WIDTH;
    icon.x = 0;
    icon.y = startPosition * REEL_ICON_HEIGHT;
    this.addChild(icon);
    this.icons.unshift(icon);
    return icon;
  }

  spin([...finalIcons]: Array<number>): Promise<Array<number>> {
    this.finalIcons = finalIcons;
    if (this.isSpinning) {
      return Promise.reject("Reel is already spinning");
    }

    return new Promise((resolve, reject) => {
      this.isSpinning = true;
      this.icons = [];

      // spin speed based on settings
      const MAX_ICONS_PER_SECOND =
        (60 * SLOT_SPIN_SPEED) / REEL_ICON_HEIGHT - 3;

      const MAX_ICONS_PER_ROLL_TIME = Math.floor(
        (MAX_ICONS_PER_SECOND * SLOT_ROLL_TIME) / 1000
      );

      const DELAY_SPINS = Math.floor(
        (MAX_ICONS_PER_SECOND * SLOT_ROLL_DELAY * this.reelIndex) / 1000
      );

      const VARIANCE_SPINS = Math.floor(
        (MAX_ICONS_PER_SECOND * getRandomInt(1, SLOT_ROLL_DELAY_VARIANCE)) /
          1000
      );

      // prepare spin icons
      const preSetReel = new Array(
        MAX_ICONS_PER_ROLL_TIME + DELAY_SPINS + VARIANCE_SPINS
      )
        .fill(0)
        .map(() => {
          return getRandomInt(1, SLOT_ICON_COUNT + 1);
        });
      finalIcons.map((f) => preSetReel.push(f));
      preSetReel.map((f, i) => this.addIcon(f, -i - 1));

      // calc time with settings & icons
      const REEL_HEIGHT = preSetReel.length * REEL_ICON_HEIGHT;
      const REEL_SPEED = SLOT_SPIN_SPEED;
      let THROLLE_SPEED = REEL_SPEED;

      const START_TIME = Date.now();

      this.animation = async () => {
        if (this.y + REEL_SPEED > REEL_HEIGHT) {
          // throttle last spin speed
          if (THROLLE_SPEED < 2) {
            THROLLE_SPEED = 1;
          } else {
            THROLLE_SPEED = Math.floor(THROLLE_SPEED / 2);
          }
          this.y += THROLLE_SPEED;
        } else {
          this.y += REEL_SPEED;
        }

        if (this.y > preSetReel.length * REEL_ICON_HEIGHT) {
          this.ticker.remove(this.animation);

          await this.bounceReel();
          console.log(
            `Reelspin ${this.reelIndex} done. Reel took ${
              Date.now() - START_TIME
            }ms`
          );
          resolve(finalIcons);
        }
      };
      this.ticker.add(this.animation);
      this.ticker.start();
    });
  }

  bounceReel(): Promise<void> {
    // todo: adapt bounce animation to spin speed and icon height
    return new Promise((resolve, reject) => {
      let BOUNCE_SPEED = 8;
      this.bounceAnmation = async () => {
        if (this.y > this.height - SLOT_HEIGHT) {
          this.y -= BOUNCE_SPEED;
          BOUNCE_SPEED = Math.floor(BOUNCE_SPEED / 2);
          if (BOUNCE_SPEED < 1) {
            BOUNCE_SPEED = 1;
          }
        } else {
          this.ticker.remove(this.bounceAnmation);
          await this.prepareNextSpin(this.finalIcons);
          resolve();
        }
      };

      this.ticker.add(this.bounceAnmation);
    });
  }

  prepareNextSpin(finalIcons: Number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (finalIcons.length != SLOT_ICONS_PER_REEL_COUNT) {
        throw new Error("finalIcons.length != SLOT_ICONS_PER_REEL_COUNT");
      }

      this.icons = [];
      this.removeChildren();
      this.y = 0;
      for (let i = 0; i < SLOT_ICONS_PER_REEL_COUNT; i++) {
        this.addIcon(finalIcons.reverse()[i].toString(), i);
      }
      this.isSpinning = false;
      resolve();
    });
  }
}
