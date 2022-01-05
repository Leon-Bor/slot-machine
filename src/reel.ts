import { Container, Sprite, Texture, Ticker } from "pixi.js";
import {
  SLOT_HEIGHT,
  SLOT_ICONS_PER_REEL_COUNT,
  SLOT_ICON_COUNT,
  SLOT_REEL_COUNT,
  SLOT_WIDTH,
} from "./game";

export class Reel extends Container {
  icons: any[];

  constructor(public container: Container) {
    super();

    this.icons = [];
    for (let i = 0; i < SLOT_ICON_COUNT; i++) {
      const texture = Texture.from(`assets/${i + 1}.png`);
      const icon = new Sprite(texture);
      icon.height = SLOT_HEIGHT / SLOT_ICONS_PER_REEL_COUNT;
      icon.width = SLOT_WIDTH / SLOT_REEL_COUNT;
      icon.x = this.x + i;
      icon.y = i * (SLOT_HEIGHT / SLOT_ICONS_PER_REEL_COUNT);
      this.icons.push(icon);
      container.addChild(icon);
    }
    this.spin();
  }

  spin() {
    let ticker = new Ticker();

    ticker.add(() => {
      for (let i = 0; i < this.icons.length; i++) {
        this.icons[i].y += 1;

        if (this.icons[i].y > this.y + SLOT_HEIGHT) {
          this.icons[i].y = 0;
        }
      }
    });

    ticker.start();
  }
}
