import {
  Container,
  Graphics,
  GraphicsGeometry,
  ObservablePoint,
  Point,
  filters,
} from "pixi.js";

import {
  REEL_ICON_HEIGHT,
  REEL_ICON_WIDTH,
  SLOT_MARGIN_LEFT_RIGHT,
  SLOT_MARGIN_TOP_BOTTOM,
  SLOT_WIDTH,
} from "../game";
import { GlowFilter } from "pixi-filters";

export class WinLines extends Container {
  constructor(public container: Container) {
    super();
    this.x = 0; // SLOT_MARGIN_LEFT_RIGHT / 2;
    this.y = 0; // SLOT_MARGIN_TOP_BOTTOM / 2;

    this.container.addChild(this);
  }

  drawWinLines(winLines: Array<Array<number>>): void {
    this.clear();
    winLines.forEach((line) => {
      const points: Point[] = [];

      // left to first
      points.push(
        new Point(0, line[0] * REEL_ICON_HEIGHT + REEL_ICON_HEIGHT / 2)
      );
      // lines in between
      line.map((rowNr, index) => {
        points.push(
          new Point(
            index * REEL_ICON_WIDTH + REEL_ICON_WIDTH / 2,
            rowNr * REEL_ICON_HEIGHT + REEL_ICON_HEIGHT / 2
          )
        );
      });
      // last to right
      points.push(
        new Point(
          SLOT_WIDTH,
          line[line.length - 1] * REEL_ICON_HEIGHT + REEL_ICON_HEIGHT / 2
        )
      );

      this.drawLine(points);
    });
  }

  private drawLine(points: Array<Point>) {
    const line = new Graphics();
    line.lineStyle(5, 0xf616f3);

    for (let index = 0; index < points.length; index++) {
      const p = points[index];

      if (index === 0) {
        line.moveTo(p.x, p.y);
      } else {
        line.lineTo(p.x, p.y);
      }
    }

    line.filters = [
      new GlowFilter({
        distance: 10,
        outerStrength: 1.5,
        innerStrength: 0.5,
        color: 0xffffff,
        quality: 1,
      }),
    ];

    this.addChild(line);
  }

  clear(): void {
    this.removeChildren();
  }
}
