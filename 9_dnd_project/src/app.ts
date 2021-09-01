(function () {
  // INPUT VALIDATION
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  function validate(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required) {
      isValid = isValid && validatableInput.value.toString().length !== 0;
    }

    if (
      validatableInput.minLength !== undefined &&
      validatableInput.minLength !== null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid &&
        validatableInput.value.trim().length >= validatableInput.minLength;
    }

    if (
      validatableInput.maxLength !== undefined &&
      validatableInput.maxLength !== null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid &&
        validatableInput.value.trim().length <= validatableInput.maxLength;
    }

    if (
      validatableInput.max !== undefined &&
      validatableInput.max !== null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    if (
      validatableInput.min !== undefined &&
      validatableInput.min !== null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    return isValid;
  }

  // METHOD DECORATORS
  // Automatically binds the `this` context of a method to caller
  function Autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    return {
      configurable: true,
      enumerable: false,
      get() {
        return descriptor.value.bind(this);
      },
    };
  }

  // PROJECT LIST CLASS
  class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: "active" | "finished") {
      this.templateElement = document.querySelector("#project-list")!;
      this.hostElement = document.querySelector("#app")!;

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild! as HTMLElement;
      this.element.id = `${this.type}-projects`;

      this.attach();
      this.renderContent();
    }

    private attach() {
      this.hostElement.insertAdjacentElement("beforeend", this.element);
    }

    private renderContent() {
      const listId = `${this.type}-projects-list`;
      const list = this.element.querySelector("ul")!;
      list.id = listId;
      const title = this.element.querySelector("h2")!;
      title.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
  }

  // PROJECT INPUT CLASS
  class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
      this.templateElement = document.querySelector("#project-input")!;
      this.hostElement = document.querySelector("#app")!;

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild! as HTMLFormElement;
      this.element.id = "user-input";

      this.titleInput = this.element.querySelector("#title")!;
      this.descriptionInput = this.element.querySelector("#description")!;
      this.peopleInput = this.element.querySelector("#people")!;

      this.configure();
      this.attach();
    }

    // Event handlers
    @Autobind
    private submitHandler(evt: Event) {
      evt.preventDefault();
      const userInputs = this.gatherUserInput();
      if (!Array.isArray(userInputs)) return;
      const [title, description, peopleCount] = userInputs;
      console.log({ title, description, peopleCount });
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

    // Add event listeners
    private configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    // Render
    private attach() {
      this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
  }

  const projectInput = new ProjectInput();
  console.log({ projectInput });

  const activeProjectList = new ProjectList("active");
  console.log({ activeProjectList });

  const finishedProjectList = new ProjectList("finished");
  console.log({ finishedProjectList });
})();
