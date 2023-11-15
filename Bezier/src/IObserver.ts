import { ControlPoint } from "./ControlPoint";

export interface IObserver {
  updateFromObservable: (element: ControlPoint) => void;
  updateObservable: () => void;
  setObservable: (element: ControlPoint | null) => void;
}
