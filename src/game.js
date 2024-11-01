import { Colors } from "./constants";

export const game = (k) => {
  return k.scene("game", () => {
    let death = false;
    const music = k.play("bgm", {
      volume: 0.7,
      loop: true,
    });

    // k.add([
    //   k.rect(10, k.height(), 0, 0),
    //   k.pos(0, 0),
    //   k.color(k.Color.fromHex(Colors.primary)),
    //   k.anchor("center"),
    //   k.area(),
    // ]);
    k.add([
      k.rect(1, k.height()),
      k.area(),
      k.outline(1),
      k.pos(0, 0),
      k.body({ isStatic: true }),
    ]);
    k.add([
      k.rect(1, k.height()),
      k.area(),
      k.outline(1),
      k.pos(k.width() - 1, 0),
      k.body({ isStatic: true }),
    ]);
    const bgRandom = k.randi(1, 8);
    const background = k.add([
      k.pos(0, 0),
      k.sprite(`background${bgRandom}`, {
        width: k.width(),
        height: k.height(),
        tiled: true,
      }),
    ]);
    // HUD
    // k.add([
    //   k.text("Score", {
    //     size: 60,
    //     font: "SuperMario256",
    //   }),
    //   k.anchor("center"),
    //   k.pos(0, 0),
    // ]);
    k.add([
      k.rect(k.width(), 50),
      k.area(),
      k.outline(1),
      k.pos(0, 0),
      k.z(10),
      k.color(k.Color.fromHex(Colors.white)),
    ]);
    const score = k.add([
      k.text("Score : 0", {
        size: 40,
        font: "SuperMario256",
      }),
      k.anchor("topleft"),
      k.z(10),
      k.pos(5, 5),
      k.color(k.Color.fromHex(Colors.primary)),
      { value: 0 },
    ]);
    // k.add([
    //   k.text("Game", {
    //     size: 60,
    //     font: "SuperMario256",
    //   }),
    //   k.anchor("center"),
    //   k.pos(k.center().x, k.center().y - 180),
    // ]);
    const player = k.add([
      k.pos(k.width() / 2, k.height() - 40),
      k.sprite("spaceship"),
      { speed: 300 },
      k.area(),
      k.body(),
      k.anchor("center"),
      "player",
    ]);
    const makeEnemy = () => {
      const enemyRandom = k.randi(1, 3);
      return k.add([
        k.pos(k.rand(k.vec2(k.width() - 40, 0))),
        k.sprite(`enemy${enemyRandom}`),
        k.area(),
        k.anchor("center"),
        // k.scale(4),
        {
          speed: 150,
          fireTimer: 0.1,
          fireTime: k.rand(40, 50),
        },
        "enemy",
      ]);
    };
    makeEnemy();
    makeEnemy();
    makeEnemy();
    makeEnemy();
    makeEnemy();
    // player.play("idle");
    // k.onKeyDown("w", () => {
    //   player.move(0, -player.speed);
    // });
    // k.onKeyDown("s", () => {
    //   player.move(0, player.speed);
    // });
    // k.onUpdate(() => {
    //   if (k.isKeyDown("w")) {
    //     player.move(player.pos.x, -player.speed);
    //   }
    // });
    k.onKeyDown("a", () => {
      player.move(-player.speed, 0);
    });
    k.onKeyDown("d", () => {
      player.move(player.speed, 0);
    });
    // k.onKeyPress("r", () => {
    //   k.go("game over");
    // });
    k.onKeyPress("escape", () => {
      music.stop();
      k.go("menu");
    });

    k.onKeyPress("space", () => {
      if (!death && player.pos) {
        k.play("lasers", { volume: 0.7 });
        k.add([
          k.sprite("laser"),
          k.pos(player.pos.x, player.pos.y - 20),
          { speed: 300 },
          k.scale(0.3),
          k.anchor("center"),
          k.offscreen({ destroy: true }),
          k.area(),
          "laser",
        ]);
      }
    });
    k.onUpdate("laser", (laser) => {
      laser.move(0, -laser.speed);
    });
    k.onUpdate("enemy", (enemy) => {
      enemy.move(0, enemy.speed);
      enemy.fireTimer++;

      if (enemy.pos.y >= k.height()) {
        k.destroy(enemy);
        makeEnemy(k);
      }
      if (enemy.pos && enemy.fireTimer >= enemy.fireTime) {
        // k.play("bullet", { volume: 0.3 });
        k.play("bullets", { volume: 0.5 });
        k.add([
          k.sprite("bullet"),
          k.pos(enemy.pos.x, enemy.pos.y + 32),
          k.area(),
          k.anchor("center"),
          k.offscreen({ destroy: true }),
          k.scale(0.1),
          {
            speed: 500,
          },
          "bullet",
        ]);
        enemy.fireTimer = 0.1;
      }
    });
    k.onUpdate("bullet", (bullet) => {
      bullet.move(0, bullet.speed);
    });
    // Collide
    k.onCollide("laser", "enemy", (laser, enemy) => {
      score.value += 10;
      score.text = "Score :" + score.value;
      if (enemy.pos) {
        k.play("explosions", { volume: 0.8 });
        const explosion = k.add([
          k.sprite("explosion"),
          k.pos(enemy.pos.x, enemy.pos.y),
          k.anchor("center"),
          k.scale(2.5),
          k.timer(),
          {
            speed: 150,
          },
          "explosion",
        ]);
        explosion.play("boom");
        explosion.wait(5, () => {
          k.destroy(explosion);
        });
      }
      k.destroy(laser);
      k.destroy(enemy);
      makeEnemy();
    });
    k.onCollide("player", "bullet", (player, bullet) => {
      // k.destroy(player);
      if (player.pos) {
        k.play("explosions", { volume: 0.8 });
        const explosion = k.add([
          k.sprite("explosion"),
          k.pos(player.pos.x, player.pos.y),
          k.anchor("center"),
          k.scale(2.5),
          k.timer(),
          {
            speed: 150,
          },
          "explosion",
        ]);
        explosion.play("boom");
        explosion.wait(1, () => {
          k.destroy(explosion);
          music.stop();
          k.go("game over");
        });
      }
      death = true;
      k.destroy(bullet);
      k.destroy(player);
    });
    k.onCollide("player", "enemy", (player, enemy) => {
      // k.destroy(player);
      if (player.pos) {
        k.play("explosions", { volume: 0.8 });
        const explosion = k.add([
          k.sprite("explosion"),
          k.pos(player.pos.x, player.pos.y),
          k.anchor("center"),
          k.scale(2.5),
          k.timer(),
          {
            speed: 150,
          },
          "explosion",
        ]);
        explosion.play("boom");
        explosion.wait(2, () => {
          k.destroy(explosion);
          music.stop();
          k.go("game over");
        });
      }
      if (enemy.pos) {
        k.play("explosions", { volume: 0.8 });
        const explosion = k.add([
          k.sprite("explosion"),
          k.pos(enemy.pos.x, enemy.pos.y),
          k.anchor("center"),
          k.scale(2.5),
          k.timer(),
          {
            speed: 150,
          },
          "explosion",
        ]);
        explosion.play("boom");
        explosion.wait(2, () => {
          k.destroy(explosion);
        });
      }
      death = true;
      k.destroy(enemy);
      k.destroy(player);
    });
  });
};
