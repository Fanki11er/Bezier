import { Point } from "./Point";

export class ControlPoint extends Point {
  private radius = 5;
  private isHovered: boolean = false;
  constructor(x: number, y: number) {
    super(x, y);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fill();

    if (this.isHovered) {
      ctx.strokeStyle = "#0D82D7";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 1, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  isMouseOver(mouseX: number, mouseY: number) {
    const xDistance = mouseX - this.x;
    const yDistance = mouseY - this.y;
    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    if (distance < this.radius) {
      this.isHovered = true;
      return true;
    }
    this.isHovered = false;
    return false;
  }

  move(toX: number, toY: number) {
    console.log("Move");
  }
}
