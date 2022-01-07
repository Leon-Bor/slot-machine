import { Game } from "./game";
import "./styles.scss";
// @ts-ignore
import Starback from "starback";

window.onload = function () {
  const game = new Game(() => {
    // hide loading
    const intro = document.getElementsByClassName("intro")?.[0];
    if (intro) {
      intro.classList.add("loaded");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
      game.spin();
      event.preventDefault();
    }
  });
};
