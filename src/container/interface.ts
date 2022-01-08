import { GlowFilter, DropShadowFilter } from "pixi-filters";
import { Container, Sprite, Texture, Text } from "pixi.js";
import {
  SLOT_HEIGHT,
  SLOT_MARGIN_LEFT_RIGHT,
  SLOT_MARGIN_TOP_BOTTOM,
  SLOT_WIDTH,
} from "./game";
import { Controls } from "./slot";

const LOGO_WIDTH = 720;
const LOGO_HEIGHT = 92;

const SPIN_BUTTON_WIDTH = 166;
const SPIN_BUTTON_HEIGHT = 47;

export class Interface extends Container {
  noCredits?: Text;
  winAmount?: Text;
  credits?: Text;
  spinButton?: Sprite;

  constructor(
    private mainContainer: Container,
    private slotContainer: Container,
    private controls: Controls
  ) {
    super();
    this.addbBackground();
    this.addLogo();
    this.addSpinButton();
    this.mainContainer.addChild(this);
  }

  addLogo() {
    const texture = Texture.from("logo");
    const sprite = new Sprite(texture);
    sprite.height = LOGO_HEIGHT;
    sprite.width = LOGO_WIDTH;
    sprite.x = LOGO_WIDTH / 2 + SLOT_MARGIN_LEFT_RIGHT / 2;
    sprite.y = LOGO_HEIGHT / 2;
    sprite.anchor.set(0.5);
    this.addChild(sprite);
  }
  addbBackground() {
    const texture = Texture.from("bg");
    const sprite = new Sprite(texture);
    sprite.height = SLOT_MARGIN_TOP_BOTTOM + SLOT_HEIGHT;
    sprite.width = SLOT_MARGIN_LEFT_RIGHT + SLOT_WIDTH;

    sprite.x = 0;
    sprite.y = 0;
    this.addChild(sprite);
  }

  addSpinButton(pressed = false) {
    const btn = pressed
      ? Texture.from("button-pressed")
      : Texture.from("button");
    this.spinButton = new Sprite(btn);

    this.spinButton.height = SPIN_BUTTON_HEIGHT;
    this.spinButton.width = SPIN_BUTTON_WIDTH;

    this.spinButton.x =
      SLOT_WIDTH - SPIN_BUTTON_WIDTH / 2 + SLOT_MARGIN_LEFT_RIGHT / 2 - 4;
    this.spinButton.y =
      SLOT_HEIGHT +
      SPIN_BUTTON_HEIGHT / 2 +
      SLOT_MARGIN_TOP_BOTTOM / 2 +
      SLOT_MARGIN_TOP_BOTTOM / 8;

    this.spinButton.anchor.set(0.5);
    this.spinButton.interactive = true;
    this.spinButton.buttonMode = true;

    const onClick = () => {
      this.controls.spin();
    };

    this.spinButton.on("mousedown", onClick);

    this.spinButton.on("touchstart", onClick);

    this.addChild(this.spinButton);
  }

  setCredits(amount: number) {
    if (this.credits) {
      this.removeChild(this.credits);
    }

    this.credits = new Text(`Credits: ${amount}`, {
      fontFamily: "Arial",
      fontSize: 34,
      fill: 0xffffff,
      align: "center",
    });

    this.credits.x = SLOT_MARGIN_LEFT_RIGHT / 2;
    this.credits.y =
      SLOT_MARGIN_TOP_BOTTOM / 2 + SLOT_HEIGHT + SLOT_MARGIN_TOP_BOTTOM / 8;
    this.addChild(this.credits);
  }

  onSpinStart() {
    if (this.winAmount) {
      this.slotContainer.removeChild(this.winAmount);
    }
    this.addSpinButton(true);
  }

  onSpinDone() {
    this.addSpinButton(false);
  }

  showWinAmount(amount: number) {
    this.winAmount = new Text(`You have won\n${amount} credits!`, {
      fontFamily: "Arial",
      fontSize: 54,
      fill: 0xffffff,
      align: "center",
    });

    this.winAmount.filters = [
      new GlowFilter({
        distance: 10,
        outerStrength: 1.5,
        innerStrength: 0.5,
        color: 0xffffff,
        quality: 1,
      }),
      new DropShadowFilter({
        color: 0x000000,
        alpha: 1,
        blur: 5,
        distance: 0,
      }),
    ];

    this.winAmount.anchor.set(0.5);
    this.winAmount.x = SLOT_WIDTH / 2;
    this.winAmount.y = SLOT_HEIGHT / 2;
    this.slotContainer.addChild(this.winAmount);
  }

  showNoCreditsMessage() {
    this.noCredits = new Text(`Game over!`, {
      fontFamily: "Arial",
      fontSize: 70,
      fill: 0xffffff,
      align: "center",
    });

    this.noCredits.filters = [
      new DropShadowFilter({
        color: 0x000000,
        alpha: 1,
        blur: 5,
        distance: 0,
      }),
      new DropShadowFilter({
        color: 0x000000,
        alpha: 1,
        blur: 15,
        distance: 0,
      }),
    ];

    this.noCredits.anchor.set(0.5);
    this.noCredits.x = SLOT_WIDTH / 2;
    this.noCredits.y = SLOT_HEIGHT / 2;
    this.slotContainer.addChild(this.noCredits);
  }

  hideNoCreditsMessage() {
    if (this.noCredits) {
      this.slotContainer.removeChild(this.noCredits);
    }
  }
}
