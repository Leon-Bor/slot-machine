import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { getRandomInt } from "./helper";
import {
  REEL_ICON_HEIGHT,
  REEL_ICON_WIDTH,
  SLOT_HEIGHT,
  SLOT_ICONS_PER_REEL_COUNT,
  SLOT_ICON_COUNT,
} from "./game";

export class Reel extends Container {
  icons: Sprite[];
  visibleIcons: Sprite[];

  constructor(public container: Container, public reelIndex: number) {
    super();

    this.icons = [];
    this.visibleIcons = [];

    for (let i = 0; i < SLOT_ICON_COUNT; i++) {
      const texture = Texture.from(`assets/${i + 1}.png`);
      const icon = new Sprite(texture);
      icon.height = REEL_ICON_HEIGHT;
      icon.width = REEL_ICON_WIDTH;
      icon.x = reelIndex * REEL_ICON_WIDTH;
      icon.y = i * (REEL_ICON_HEIGHT * -1);
      this.icons.push(icon);
      container.addChild(icon);
    }

    for (let index = 0; index < SLOT_ICONS_PER_REEL_COUNT + 1; index++) {
      const element = this.icons[index];
      this.visibleIcons.push(element);
    }

    this.spin();
  }

  spin() {
    let ticker = new Ticker();

    ticker.add(() => {
      for (let index = 0; index < this.visibleIcons.length; index++) {
        const element = this.visibleIcons[index];

        element.y += 15;

        if (element.y > SLOT_HEIGHT) {
          element.y = REEL_ICON_HEIGHT * -1;
          this.visibleIcons.pop();
        }

        if (this.visibleIcons.length < SLOT_ICONS_PER_REEL_COUNT + 1) {
          const rand = getRandomInt(0, SLOT_ICON_COUNT);
          console.log(rand);
          this.visibleIcons.unshift(this.icons[rand]);
        }
      }
    });

    ticker.start();
  }
}
