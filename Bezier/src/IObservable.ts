import { PointInput } from "./PointInput";

export interface IObservable {
  addObserver: (observer: PointInput) => void;
  removeObserver: () => void;
}
