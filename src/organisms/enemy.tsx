import { Player } from "./player";
import { Path, Point } from "paper";

class Enemy extends Player {
  constructor() {
    super();
    this.color = "red";
    this.radius = 50;
    this.health = {
      ...this.health,
      width: 100,
      offset: {
        x: 50,
        y: 75,
      },
    };
    this.speed = 4;
    this.damage = 0.01;
    this.initPossition = new Point({
      x: window.innerWidth + this.radius,
      y: window.innerHeight + this.radius,
    });
    this.path.remove();
    this.path = new Path.Circle({
      ...this.initPossition,
      fillColor: this.color,
      radius: this.radius,
    });
  }

  //@overwrite
  //@ts-ignore
  moveEntity(playerPosition: paper.Point) {
    // move the enemy towards the player.
    const etoP = playerPosition.subtract(this.path.position);
    // this.path.position = this.path.position.add(etoP.normalize(this.speed));
  }

  //@overwrite
  //@ts-ignore
  draw({ player, onPlayerDeath }) {
    this.moveEntity(player.position);
    this.moveHeathBar();
    this.checkIfDead(onPlayerDeath);
  }
}

export { Enemy };
