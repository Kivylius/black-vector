import * as paper from "paper";
import { Point, Tool } from "paper";
import { Enemy } from "../organisms/enemy";
import { Player } from "../organisms/player";
import { Projectiles } from "../organisms/projectiles";

class Game {
  running = false;
  constructor() {
    console.log("constructed", { this: this });
  }

  start({ onFail, onFinish }: {  onFail: () => void, onFinish: (endTime: number) => void  }) {
    console.log('start');
    let paperScope = paper.setup("myCanvas") as unknown as typeof paper;
    let start = Date.now();
    let player = new Player();
    let enemy = new Enemy();
    let projectile = new Projectiles();
    let mouse = new Point([0, 0]);
    let tool = new Tool();
    let key = "";
    this.running = true;

    tool.onMouseMove = ({ point, event, }: {
      point: paper.Point;
      event: MouseEvent;
    }) => {
      mouse.set(point);
    };

    tool.onKeyDown = (event: KeyboardEvent) => {
      if (!this.running) return;
      if (key !== event.key) {
        key = event.key;
      }
    };

    const reset = () => {
      this.running = false;
      tool.remove();
      paperScope.project.activeLayer.removeChildren();
      projectile.reset();
      projectile.reset();
    }

    tool.onMouseUp = () => {
      if (!this.running) return;

      projectile.create(player.player, player.cursor);
    }

    paperScope.view.onFrame = () => {
      if (!this.running) return;

      // player collision
      player.draw({ mouse, key, onPlayerDeath: () => {
        reset();
        onFail();
      }});

      // player draw
      enemy.draw({ player: player.player, onPlayerDeath: () => {
        reset();
        let end = Date.now();
        onFinish((end - start) / 1000);
      }});

      // colide two object.
      const distance = player.player.position.getDistance(
        enemy.player.position
      );
      if (distance - player.radius < enemy.radius) {
        player.takeDamage();
      }

      // projectiles draw
      projectile.draw({collisions: [
        enemy.player
      ], onCollision: () => {
        enemy.takeDamage();
        return true; // remove it
      }})

    }
  }

  reset() {
    this.running = false;
  }
};

export { Game };


