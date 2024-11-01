import { Colors } from "./constants";

export const mainMenu = (k) => {
  return k.scene("menu", () => {
    k.add([k.pos(170, -30), k.sprite("testbg")]);
    // k.add([
    //   k.pos(420, 200),
    //   k.circle(101),
    //   k.color(k.Color.fromHex("#000000")),
    // ]);
    k.add([k.pos(420, 200), k.circle(100)]);
    k.add([
      k.text("Space Battle", {
        size: 60,
        font: "SuperMario256",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex(Colors.primary)),
      k.pos(k.center().x, k.center().y - 20),
    ]);
    k.add([
      k.text("Space Battle", {
        size: 63,
        font: "SuperMario256",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex(Colors.yellow)),
      k.pos(k.center().x, k.center().y - 20),
    ]);

    // k.add([
    //   k.text("Created by Maya", {
    //     size: 20,
    //   }),
    //   k.anchor("center"),
    //   k.color(k.Color.fromHex(Colors.white)),
    //   k.pos(k.center().x, k.center().y + 100),
    // ]);
    const credit = k.add([
      k.rect(200, 20, 0, 0),
      k.pos(k.center().x, k.center().y + 100),
      k.color(k.Color.fromHex("#000000")),
      k.anchor("center"),
      k.area(),
      "credit",
    ]);
    const credit1 = credit.add([
      k.text("Created by Maya", {
        size: 10,
        font: "SuperMario256",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex(Colors.white)),
    ]);
    const startButton = k.add([
      k.rect(100, 40, 0, 0),
      k.pos(k.center().x, k.center().y + 40),
      k.color(k.Color.fromHex(Colors.primary)),
      k.anchor("center"),
      k.area(),
      "startButton",
    ]);

    const startBT = startButton.add([
      k.text("START", { size: 18, font: "SuperMario256" }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#000000")),
    ]);
    k.onHover("startButton", () => {
      startButton.color = k.Color.fromHex(Colors["light-primary"]);
      startBT.color = k.Color.fromHex(Colors.white);
    });
    k.onHoverEnd("startButton", () => {
      startButton.color = k.Color.fromHex(Colors.primary);
      startBT.color = k.Color.fromHex("#000000");
    });
    k.onClick("startButton", () => {
      k.go("game");
    });
    k.onKeyPress("enter", () => {
      k.go("game");
    });
  });
};
