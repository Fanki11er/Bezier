import { IObservable } from "./IObservable";

export interface IObserver {
  updateFromObservable: (element: IObservable) => void;
  updateObservable: () => void;
  setObservable: (element: IObservable | null) => void;
  connect: () => void;
  disconnect: () => void;
}
