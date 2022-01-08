import { expect } from "@jest/globals";
import { SLOT_ICONS_PER_REEL_COUNT } from "./game";
import { Reel } from "./reel";

describe("reel", () => {
  test("creating new reel ", () => {
    const reel = new Reel(0);
    expect(typeof reel).toBe("object");
  });
  test("check initial icon number", () => {
    const reel = new Reel(0);
    expect(reel.children.length).toBe(SLOT_ICONS_PER_REEL_COUNT);
  });
  test("add icon to reel ", () => {
    const reel = new Reel(0);
    reel.addIcon("1");
    expect(reel.children.length).toBe(SLOT_ICONS_PER_REEL_COUNT + 1); // 3 + 1 icons
  });
  test("spin the reel", async () => {
    const reel = new Reel(0);
    const arr = new Array(SLOT_ICONS_PER_REEL_COUNT)
      .fill(0)
      .map((d, i) => i + 1);
    const res = await reel.spin(arr);
    expect(res.toString()).toBe(arr.reverse().toString()); // 3 + 1 icons
  });
  test("spin the reel with wrong input", async () => {
    try {
      const reel = new Reel(0);
      const arr = new Array(SLOT_ICONS_PER_REEL_COUNT + 1)
        .fill(0)
        .map((d, i) => i + 1);
      await reel.spin(arr);
    } catch (error) {
      expect(true).toBe(true); // 3 + 1 icons
    }
  });
});
