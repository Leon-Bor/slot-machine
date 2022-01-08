import { getRandomInt, rotateMatrixLeft, rotateMatrixRight } from "./helper";

describe("Random function testing", () => {
  test("get a random one ", () => {
    expect(getRandomInt(1, 1)).toBe(1);
  });

  test("higher than 5 ", () => {
    expect(getRandomInt(5, 10)).toBeGreaterThanOrEqual(5);
  });
});

describe("matrix rotation", () => {
  test("rotate left ", () => {
    expect(
      rotateMatrixLeft([
        [1, 2, 3],
        [4, 4, 4],
      ]).toString()
    ).toBe(
      [
        [3, 4],
        [2, 4],
        [1, 4],
      ].toString()
    );
  });

  test("rotate right", () => {
    expect(
      rotateMatrixRight([
        [1, 2, 3],
        [4, 4, 4],
      ]).toString()
    ).toBe(
      [
        [4, 1],
        [4, 2],
        [4, 3],
      ].toString()
    );
  });
});
