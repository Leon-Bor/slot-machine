import { Game } from "./container/game";
import "./styles.scss";

window.onload = function () {
  const onLoaded = () => {
    const intro = document.getElementsByClassName("intro")?.[0];
    if (intro) {
      intro.classList.add("loaded");
    }
  };

  new Game(onLoaded);
};
