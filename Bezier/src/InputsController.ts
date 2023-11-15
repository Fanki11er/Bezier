import { BezierBoard } from "./BezierBoard";
import { PointInput } from "./PointInput";

export class InputsController {
  controller;
  addPointInputElement;
  addPointInputButton;
  board;
  controlPointsInputs: PointInput[] = [];
  constructor(
    board: BezierBoard,
    controllerId: string,
    addPointInput: string,
    addPointInputButtonId: string
  ) {
    this.controller = document.getElementById(controllerId);
    const inputElement = document.getElementById(
      addPointInput
    ) as HTMLInputElement | null;
    this.addPointInputElement = new PointInput(inputElement);
    this.addPointInputButton = document.getElementById(addPointInputButtonId);

    if (this.addPointInputButton && this.addPointInputElement) {
      this.addPointInputButton.addEventListener("click", () => {
        const value = this.addPointInputElement.getValue();
        if (value) {
          board.addControlPoint(value.x, value.y);
          this.addPointInputElement.setValue("");
        }
      });
    }

    this.board = board;
  }

  createInput(inputId: number) {
    const newInput = document.createElement("input");
    newInput.classList.add("point_input");
    newInput.id = `pointInput_#${inputId}`;
    return newInput;
  }

  createLabel(pointNumber: number) {
    const newInputLabel = document.createElement("label");
    newInputLabel.classList.add("point_input_label");
    newInputLabel.innerText = `Punkt ${pointNumber}`;
    return newInputLabel;
  }

  addPointInput(x: number, y: number) {
    const input = this.createInput(this.controlPointsInputs.length + 1);
    const label = this.createLabel(this.controlPointsInputs.length + 1);

    label.appendChild(input);
    this.controller?.appendChild(label);

    const controlPointInput = new PointInput(input);
    controlPointInput.setValue(`${x.toFixed(0)},${y.toFixed(0)}`);
    this.controlPointsInputs.push(controlPointInput);
    return controlPointInput;
  }
}
