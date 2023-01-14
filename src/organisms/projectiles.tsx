import { Path, Point } from "paper";

const center = new Point([window.innerWidth / 2, window.innerHeight / 2]);

class Projectiles {
  projectiles: paper.Path.Circle[] = [];
  radius = 2;
  color = "white";
  constructor() {
    console.log("constructed", { this: this });
  }

  create(from: paper.Path.Circle, to: paper.Path.Circle) {
    const ptoC = to.position.subtract(from.position);
    const pToCDirrVector = ptoC.normalize(1);
    // const atPint = playerVecotr.add(player.player.cursor);

    this.projectiles.push(
      new Path.Circle({
        x: from.position.x,
        y: from.position.y,
        data: {
          //   playerVecotr,
          pToCDirrVector,
        },
        radius: this.radius,
        fillColor: this.color,
      })
    );
  }

  draw({
    collisions = [],
    onCollision,
  }: {
    collisions: paper.Path.Circle[];
    onCollision: (circle: paper.Path.Circle) => boolean;
  }) {
    // console.log(this.projectiles);
    this.projectiles = this.projectiles.filter((projectile, index) => {
      // move projectiles
      const { pToCDirrVector } = projectile.data;
      this.projectiles[index].position = projectile.position.add(
        pToCDirrVector.multiply(3)
      );

      collisions.forEach((circle: paper.Path.Circle) => {
        const distAway = projectile.position.getDistance(circle.position);
        if (distAway < circle.bounds.width * 0.5) {
          const shouldRemove = onCollision(circle);
          if (shouldRemove) {
            projectile.data.shouldRemove = true;
          }
        }
      });

      // remove old projectiles, (random number)
      if (
        projectile.data.shouldRemove ||
        center.getDistance(projectile.position) > 2000
      ) {
        projectile.remove();
        return false;
      }
      return projectile;
    });
  }
  reset() {
    this.projectiles = this.projectiles.filter((projectile) => {
      projectile.remove();
      return false;
    }) as unknown as paper.Path.Circle[];
  }
}

export { Projectiles };
