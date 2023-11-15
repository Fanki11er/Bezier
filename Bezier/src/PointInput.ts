import { ControlPoint } from "./ControlPoint";
import { IObserver } from "./IObserver";
import { Point } from "./Point";

export class PointInput implements IObserver {
  input: HTMLInputElement | null;
  error = false;
  observable!: ControlPoint | null;

  constructor(input: HTMLInputElement | null) {
    this.input = input;
    if (this.input) {
      this.input,
        addEventListener("change", () => {
          this.validate(this.input!.value!);
          if (!this.error) {
            this.updateObservable();
          }
        });
    }
  }
  updateFromObservable(element: ControlPoint) {
    this.setValue(`${element.x.toFixed(0)},${element.y.toFixed(0)}`);
  }

  updateObservable() {
    const value = this.getValue();
    if (this.observable && value !== null) {
      this.observable.x = value.x;
      this.observable.y = value.y;
    }
  }

  setObservable(element: ControlPoint | null) {
    this.observable = element;
  }

  getValue() {
    let point = null;
    if (this.input) {
      this.validate(this.input.value);
      if (this.error) {
        return point;
      }
      const values = this.input.value.split(",");
      return new Point(Number(values[0]), Number(values[1]));
    }
    return point;
  }

  setValue(value: string) {
    if (this.input) {
      this.input!.value = value;
    }
  }

  isError() {
    return this.error;
  }

  validate(value: string) {
    const regexp = new RegExp(/^\d{1,}[,]\d{1,}$/);
    if (!value.match(regexp)) {
      this.input?.classList.add("error");
      this.error = true;
    } else {
      this.input?.classList.remove("error");
      this.error = false;
    }
  }
}
