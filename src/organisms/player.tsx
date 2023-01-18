import { Path, Point } from "paper";

const zero = new Point(0, 0);

class Player {
  radius = 20;
  width = 5;
  color = "white";
  damage = 0.01;
  initPossition = new Point({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  path = new Path.Circle({
    ...this.initPossition,
    fillColor: this.color,
    radius: this.radius,
  });
  timeout = setTimeout(() => {}, 1);
  speed = 5;
  cursor = new Path.Line({
    segments: [zero, zero],
    strokeColor: "red",
    strokeWidth: 3,
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

  moveEntity(key: string) {
    switch (key) {
      case "left":
      case "a":
        this.path.position = this.path.position.add([-this.speed, 0]);
        break;
      case "down":
      case "s":
        this.path.position = this.path.position.add([0, this.speed]);
        break;
      case "right":
      case "d":
        this.path.position = this.path.position.add([this.speed, 0]);
        break;
      case "up":
      case "w":
        this.path.position = this.path.position.add([0, -this.speed]);
        break;
    }
  }

  moveHeathBar() {
    const x0 = this.path.position.x - this.health.offset.x;
    const y01 = this.path.position.y - this.health.offset.y;
    // const x1 = this.path.position.x + this.health.offset.x;

    this.health.bar.segments[0].point.x = x0;
    this.health.bar.segments[0].point.y = y01;
    this.health.bar.segments[1].point.x =
      this.path.position.x +
      (this.health.width * this.health.value - this.health.offset.x);
    this.health.bar.segments[1].point.y = y01;

    this.health.background.segments[0].point.x = x0;
    this.health.background.segments[0].point.y = y01;
    this.health.background.segments[1].point.x =
      this.path.position.x + (this.health.width - this.health.offset.x);
    this.health.background.segments[1].point.y = y01;
  }

  moveCursor(point: paper.Point) {
    const ptoC = point.subtract(this.path.position);
    const pToCDirr = ptoC.normalize(30);
    this.cursor.segments[0].point = this.path.position;
    this.cursor.segments[1].point = this.path.position.add(pToCDirr);
  }

  takeDamage() {
    this.health.value -= this.damage;
    this.path.style.fillColor = "orange" as unknown as paper.Color;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.path.style.fillColor = this.color as unknown as paper.Color;
    }, 200);
  }

  checkIfDead(onPlayerDeath = () => {}) {
    if (this.health.value <= 0) {
      onPlayerDeath();
    }
  }

  reset() {
    this.health.value = 1.0;
    this.path.position = this.initPossition;
  }

  draw({
    mouse,
    key,
    onEntityDeath,
  }: {
    mouse: paper.Point;
    key: string;
    onEntityDeath: () => void;
  }) {
    this.moveEntity(key);
    this.moveCursor(mouse);
    this.moveHeathBar();
    this.checkIfDead(onEntityDeath);
  }
}

export { Player };
