import { Game } from "./game";

window.onload = function () {
  const game = new Game();

  document.addEventListener("keydown", function (event) {
    console.log(event.keyCode == 32);
    if (event.keyCode == 32) {
      game.spin();
    }
  });
};
