import { BezierCurveDrawer } from "./BezierCurveDrawer";
import { ControlPoint } from "./ControlPoint";
import { Point } from "./Point";
import { Tool } from "./Tool";

export class BezierBoard {
  private canvas;
  ctx;
  private canvasWidth = 1200;
  private canvasHeight = 700;
  private bezierCurveDrawer;
  private selectedTool: Tool = "Cursor";
  private mousePosition = new Point(0, 0);
  private grabbedPoint: ControlPoint | null = null;

  private controlPoints: ControlPoint[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    if (canvas) {
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      this.ctx = canvas.getContext("2d");
      this.bezierCurveDrawer = new BezierCurveDrawer(this.ctx!);
      canvas.addEventListener("click", () => {
        this.addControlPoint();
      });
      canvas.addEventListener("mousemove", (e) => {
        this.onMouseMove(e);
        this.getSelectedElement();
      });
    }
  }

  render() {
    this.ctx?.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.bezierCurveDrawer?.drawBezierCurve(this.controlPoints);
    requestAnimationFrame(() => this.render());
  }

  private addControlPoint = () => {
    this.controlPoints.push(
      new ControlPoint(this.mousePosition.x, this.mousePosition.y)
    );
  };

  private getMousePositionOnCanvas(x: number, y: number) {
    const bounds = this.canvas.getBoundingClientRect();
    const mouseX = x - bounds.left;
    const mouseY = y - bounds.top;
    this.mousePosition = new Point(mouseX, mouseY);
  }

  getSelectedElement() {
    this.controlPoints.forEach((point) => {
      if (this.selectedTool === "Cursor") {
        point.isMouseOver(this.mousePosition.x, this.mousePosition.y);
      }
    });
  }

  onMouseMove(e: MouseEvent) {
    this.getMousePositionOnCanvas(e.x, e.y);
    if (this.grabbedPoint) {
      this.grabbedPoint.move(this.mousePosition.x, this.mousePosition.y);
    }
  }
}
