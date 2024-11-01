import { Colors } from "./constants";

export const gameOver = (k) => {
  return k.scene("game over", () => {
    const over = k.play("lost", { volume: 1 });
    k.add([
      k.pos(0, 0),
      k.sprite(`spongebob`, {
        width: k.width(),
        height: k.height(),
        tiled: true,
      }),
    ]);
    k.add([
      k.text("Game Over", {
        size: 60,
        font: "SuperMario256",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex(Colors.white)),
      k.pos(k.center().x, k.center().y - 20),
    ]);
    k.add([
      k.text("Press enter to play again", { size: 24, font: "SuperMario256" }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#ffffff")),
      k.pos(k.center().x, k.center().y + 40),
    ]);
    k.onKeyPress("enter", () => {
      over.stop();
      k.go("game");
    });
    k.onKeyPress("escape", () => {
      over.stop();
      k.go("menu");
    });
  });
};
