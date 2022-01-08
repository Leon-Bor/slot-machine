import { expect } from "@jest/globals";
import { Container } from "pixi.js";
import {
  SLOT_ICONS_PER_REEL_COUNT,
  SLOT_REEL_COUNT,
  SLOT_ROLL_DELAY,
  SLOT_ROLL_TIME,
} from "./game";
import { Slot } from "./slot";

window.HTMLMediaElement.prototype.load = () => {};
window.HTMLMediaElement.prototype.play = async () => {};
window.HTMLMediaElement.prototype.pause = () => {};

describe("slot", () => {
  test("creating new slot", () => {
    const slot = new Slot(new Container());
    expect(typeof slot).toBe("object");
  });

  test("check initial sprite number", () => {
    const slot = new Slot(new Container());
    expect(slot.children.length).toBe(SLOT_REEL_COUNT + 6);
  });

  test("spin", async () => {
    const slot = new Slot(new Container());
    await slot.spin();
    expect(true).toBe(true);
  });

  test("spin time", async () => {
    const slot = new Slot(new Container());
    const time = Date.now();
    await slot.spin();
    expect(Date.now() - time).toBeGreaterThan(
      SLOT_ROLL_TIME + SLOT_ROLL_DELAY * (SLOT_REEL_COUNT - 1)
    );
  });
  test("spend and receive credits", async () => {
    const slot = new Slot(new Container());
    const c1 = slot.credits + 0;
    slot.payCredits(130);
    expect(slot.credits).toBe(c1 - 130);
    const c2 = slot.credits + 0;
    slot.receiveCredits(130);
    expect(slot.credits).toBe(c2 + 130);
  });
});
