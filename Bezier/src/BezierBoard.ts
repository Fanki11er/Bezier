import { BezierCurveDrawer } from "./BezierCurveDrawer";
import { ControlPoint } from "./ControlPoint";
import { Point } from "./Point";
import { SelectToolButtons } from "./SelectToolButtons";
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
  private selectedPoint: ControlPoint | null = null;

  private controlPoints: ControlPoint[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    if (canvas) {
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      this.ctx = canvas.getContext("2d");
      this.bezierCurveDrawer = new BezierCurveDrawer(this.ctx!);
      canvas.addEventListener("mousedown", () => {
        this.onMouseDown();
      });

      canvas.addEventListener("mouseup", () => {
        this.onMouseUp();
      });

      canvas.addEventListener("mousemove", (e) => {
        this.onMouseMove(e);
      });
    }

    new SelectToolButtons(this);
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

  getSelectedPoint() {
    for (let i = 0; i < this.controlPoints.length; i++) {
      if (
        this.controlPoints[i].isMouseOver(
          this.mousePosition.x,
          this.mousePosition.y
        )
      ) {
        return this.controlPoints[i];
      }
    }
    return null;
  }

  onMouseDown() {
    if (this.selectedTool === "Cursor") {
      const item = this.getSelectedPoint();
      this.selectedPoint = item;
      if (item) {
        this.grabbedPoint = item;
      }
    }
  }

  onMouseMove(e: MouseEvent) {
    this.getMousePositionOnCanvas(e.x, e.y);
    if (!this.grabbedPoint) {
      this.getSelectedPoint();
    }

    if (this.grabbedPoint) {
      this.grabbedPoint.move(this.mousePosition.x, this.mousePosition.y);
    }
  }

  onMouseUp() {
    if (this.selectedTool === "Creator") {
      this.addControlPoint();
    }

    if (this.grabbedPoint) {
      this.grabbedPoint = null;
    }
  }

  selectTool(tool: Tool) {
    this.selectedTool = tool;
    if (this.selectedPoint) {
      this.selectedPoint.removeObserver();
      this.selectedPoint = null;
    }
  }
}
