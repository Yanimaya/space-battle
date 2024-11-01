import kaplay from "kaplay";
import "kaplay/global";
import { loadAssets } from "./load-assets";
import { mainMenu } from "./main-menu";
import { game } from "./game";
import { gameOver } from "./game-over";

const k = kaplay({
  global: false,
  texFilter: "nearest",
  scale: 2,
});

// k.loadSprite("bean", "sprites/bean.png")

// k.add([
// 	k.pos(120, 80),
// 	k.sprite("bean"),
// ])

// k.onClick(() => k.addKaboom(k.mousePos()))

k.setBackground(k.Color.fromHex("#130281"));

// k.loadFont("SuperMario256", "fonts/SuperMario256.ttf");
loadAssets(k);
mainMenu(k);
game(k);
gameOver(k);
// const player = k.add([k.pos(120, 80), k.sprite("spaceship")]);

// player.play("idle");
k.go("menu");
// k.go("game");
