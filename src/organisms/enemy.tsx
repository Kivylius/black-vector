import { Player } from "./player";
import { Path } from "paper";

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
    this.damage = 0.01;
    this.possition = {
      x: window.innerWidth + this.radius,
      y: window.innerHeight + this.radius,
    };
    this.player.remove();
    this.player = new Path.Circle({
      ...this.possition,
      fillColor: this.color,
      radius: this.radius,
    });
  }

  moveEnemy(playerPosition: paper.Point) {
    // move the enemy towards the player.
    const enemyMove = 2;
    const etoP = playerPosition.subtract(this.player.position);
    this.player.position = this.player.position.add(etoP.normalize(enemyMove));
  }

  //@overwrite
  //@ts-ignore
  draw({ player, onPlayerDeath }) {
    this.moveEnemy(player.position);
    this.moveHeathBar();
    this.checkIfDead(onPlayerDeath);
  }
}

export { Enemy };
