import { IObservable } from "./IObservable";
import { Point } from "./Point";
import { PointInput } from "./PointInput";

export class ControlPoint extends Point implements IObservable {
  private radius = 5;
  private isHovered: boolean = false;
  observer: PointInput | null = null;
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
    this.x = toX;
    this.y = toY;

    if (this.observer) {
      this.observer.updateFromObservable(this);
    }
  }

  addObserver(observer: PointInput) {
    this.observer = observer;
    this.observer.setObservable(this);
    observer.updateFromObservable(this);
  }

  removeObserver() {
    if (this.observer) {
      this.observer.setObservable(null);
      this.observer = null;
    }
  }
}
