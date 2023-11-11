import { ControlPoint } from "./ControlPoint";
import { Point } from "./Point";

export class BezierCurveDrawer {
  ctx;
  strokeStyle = "blue";
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private drawControlPoints(controlPoints: ControlPoint[]) {
    for (let i = 0; i < controlPoints.length; i++) {
      controlPoints[i].draw(this.ctx!);
    }
  }

  private calculatePointOnBezierCurve(
    controlPoints: ControlPoint[],
    t: number
  ) {
    if (controlPoints.length < 2) {
      return null;
    }

    const n = controlPoints.length - 1;
    let x = 0;
    let y = 0;

    for (let i = 0; i <= n; i++) {
      var binomialCoefficient = 1;
      for (let j = 0; j < i; j++) {
        binomialCoefficient *= (n - j) / (i - j);
      }

      const term =
        binomialCoefficient * Math.pow(1 - t, n - i) * Math.pow(t, i);
      x += controlPoints[i].x * term;
      y += controlPoints[i].y * term;
    }

    return new Point(x, y);
  }

  drawBezierCurve(controlPoints: ControlPoint[]) {
    if (!this.ctx || !controlPoints.length) {
      return null;
    }

    this.drawControlPoints(controlPoints);

    this.ctx!.beginPath();
    this.ctx!.moveTo(controlPoints[0].x, controlPoints[0].y);

    for (let t = 0; t <= 1; t += 0.001) {
      var point = this.calculatePointOnBezierCurve(controlPoints, t);
      if (point) {
        this.ctx!.lineTo(point.x, point.y);
      }
    }
    this.ctx!.strokeStyle = this.strokeStyle;
    this.ctx!.stroke();
  }
}
