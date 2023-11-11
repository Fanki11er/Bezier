import { BezierBoard } from "./BezierBoard";

const canvas: HTMLCanvasElement | null = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

if (canvas) {
  const test = new BezierBoard(canvas);
  test.render();
}
