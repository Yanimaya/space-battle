export const loadAssets = (k) => {
  // SPRITE
  k.loadSprite("spaceship", "./sprites/spaceship.png", {
    sliceX: 7,
    anims: {
      idle: {
        from: 0,
        to: 6,
        speed: 5,
        loop: true,
      },
    },
  });
  k.loadSprite("testbg", "./sprites/testbg.png");
  k.loadSprite("Spacebg", "./sprites/Spacebg.png");
  k.loadSprite("bullet", "./sprites/bullet.png", {
    sliceX: 1,
  });
  k.loadSprite("laser", "./sprites/laser.png", {
    sliceX: 1,
  });
  k.loadSprite("enemy1", "./sprites/enemy1.png", {
    sliceX: 7,
    anims: {
      idle: {
        from: 0,
        to: 6,
        speed: 5,
        loop: true,
      },
    },
  });
  k.loadSprite("enemy2", "./sprites/enemy2.png", {
    sliceX: 7,
    anims: {
      idle: {
        from: 0,
        to: 6,
        speed: 5,
        loop: true,
      },
    },
  });
  k.loadSprite("explosion", "./sprites/explosion.png", {
    sliceX: 12,
    anims: {
      boom: {
        from: 0,
        to: 11,
        speed: 100,
        loop: false,
      },
    },
  });
  // BACKGROUND
  for (let i = 1; i <= 7; ++i) {
    k.loadSprite(`background${i}`, `./images/bg${i}.png`, {
      sliceX: 1,
    });
  }
  k.loadSprite("spongebob", "./images/spongebob.png", {
    sliceX: 1,
  });
  // FONT
  k.loadFont("SuperMario256", "./fonts/SuperMario256.ttf");
  // AUDIO
  k.loadMusic("bgm", "./music/bg.mp3");
  // SOUND
  k.loadSound("bullets", "./sounds/bullet01.wav");
  k.loadSound("lasers", "./sounds/laser01.wav");
  k.loadSound("explosions", "./sounds/explosion03.wav");
  k.loadSound("lost", "./sounds/lose04.wav");
};
