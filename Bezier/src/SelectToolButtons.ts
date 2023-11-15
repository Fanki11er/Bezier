import { BezierBoard } from "./BezierBoard";
import { Tool } from "./Tool";

export class SelectToolButtons {
  buttons: NodeListOf<HTMLButtonElement> | null = null;
  board: BezierBoard;
  constructor(board: BezierBoard) {
    this.getButtons();
    this.AddClickListenersToButtons();
    this.board = board;
  }

  private getButtons() {
    this.buttons = document.querySelectorAll(".select_button");
  }

  private setActive(button: HTMLButtonElement) {
    button.classList.add("button_active");
  }

  private removeActive() {
    if (this.buttons) {
      this.buttons.forEach((button) => {
        button.classList.remove("button_active");
      });
    }
  }

  private AddClickListenersToButtons() {
    if (this.buttons) {
      this.buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const selectedTool = event.target as HTMLButtonElement;
          const tool = selectedTool.getAttribute(
            "data-selection"
          ) as Tool | null;
          this.removeActive();
          this.setActive(selectedTool);
          this.board.selectTool(tool!);
        });
      });
    }
  }
}
