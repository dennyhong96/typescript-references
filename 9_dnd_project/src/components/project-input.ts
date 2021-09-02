/// <reference path="base-component.ts" />
/// <reference path="../utils/input-validator.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project.ts" />

// PROJECT INPUT CLASS

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInput = this.element.querySelector("#title")!;
      this.descriptionInput = this.element.querySelector("#description")!;
      this.peopleInput = this.element.querySelector("#people")!;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    // Event handlers
    @Autobind
    private submitHandler(evt: Event) {
      evt.preventDefault();
      const userInputs = this.gatherUserInput();
      if (!Array.isArray(userInputs)) return;
      const [title, description, peopleCount] = userInputs;
      projectState.addProject(title, description, peopleCount);
      this.clearInput();
    }

    private gatherUserInput(): [string, string, number] | void {
      const titleValue = this.titleInput.value;
      const descriptionValue = this.descriptionInput.value;
      const peopleCount = Number(this.peopleInput.value);

      const titleValidatable: Validatable = {
        value: titleValue,
        required: true,
      };

      const descriptionValidatable: Validatable = {
        value: descriptionValue,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validatable = {
        value: peopleCount,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        return alert("Invalid inputs, please try again.");
      }

      return [titleValue, descriptionValue, peopleCount];
    }

    private clearInput() {
      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.peopleInput.value = "";
    }
  }
}
