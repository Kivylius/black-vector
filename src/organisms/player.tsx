import { Path, Point } from "paper";

const zero = new Point(0, 0);

class Player {
  radius = 20;
  width = 5;
  color = "white";
  damage = 0.01;
  possition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  player = new Path.Circle({
    ...this.possition,
    fillColor: this.color,
    radius: this.radius,
  });
  timeout = setTimeout(() => {}, 1);
  playerMove = 5;
  cursor = new Path.Line({
    segments: [zero, zero],
    strokeColor: "white",
  });
  health = {
    value: 1,
    width: 50,
    height: 5,
    offset: {
      x: 25,
      y: 35,
    },
    background: new Path({
      segments: [zero, zero],
      strokeColor: "white",
      strokeWidth: this.width + 2,
    }),
    bar: new Path({
      segments: [zero, zero],
      strokeColor: "green",
      strokeWidth: this.width,
    }),
  };

  constructor() {
    console.log("constructed", { this: this });
  }

  movePlayer(key: string) {
    switch (key) {
      case "left":
      case "a":
        this.player.position = this.player.position.add([-this.playerMove, 0]);
        break;
      case "down":
      case "s":
        this.player.position = this.player.position.add([0, this.playerMove]);
        break;
      case "right":
      case "d":
        this.player.position = this.player.position.add([this.playerMove, 0]);
        break;
      case "up":
      case "w":
        this.player.position = this.player.position.add([0, -this.playerMove]);
        break;
    }
  }

  moveHeathBar() {
    const x0 = this.player.position.x - this.health.offset.x;
    const y01 = this.player.position.y - this.health.offset.y;
    // const x1 = this.player.position.x + this.health.offset.x;

    this.health.bar.segments[0].point.x = x0;
    this.health.bar.segments[0].point.y = y01;
    this.health.bar.segments[1].point.x =
      this.player.position.x +
      (this.health.width * this.health.value - this.health.offset.x);
    this.health.bar.segments[1].point.y = y01;

    this.health.background.segments[0].point.x = x0;
    this.health.background.segments[0].point.y = y01;
    this.health.background.segments[1].point.x =
      this.player.position.x + (this.health.width - this.health.offset.x);
    this.health.background.segments[1].point.y = y01;
  }

  moveCursor(point: paper.Point) {
    this.cursor.segments[1].point = point;
    const ptoC = this.cursor.position.subtract(this.player.position);
    const pToCDirr = ptoC.normalize(30);
    this.cursor.segments[0].point = this.player.position;
    this.cursor.segments[1].point = this.player.position.add(pToCDirr);
  }

  takeDamage() {
    this.health.value -= this.damage;
    this.player.style.fillColor = "orange" as unknown as paper.Color;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.player.style.fillColor = this.color as unknown as paper.Color;
    }, 200);
  }

  checkIfDead(onPlayerDeath = () => {}) {
    if (this.health.value <= 0) {
      onPlayerDeath();
    }
  }

  reset() {
    this.health.value = 1.0;
    this.player.position = new Point(this.possition);
  }

  draw({
    mouse,
    key,
    onPlayerDeath,
  }: {
    mouse: paper.Point;
    key: string;
    onPlayerDeath: () => void;
  }) {
    this.moveCursor(mouse);
    this.movePlayer(key);
    this.moveHeathBar();
    this.checkIfDead(onPlayerDeath);
  }
}

export { Player };
