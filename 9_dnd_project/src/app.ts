(function () {
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

      if (
        titleValue.trim().length === 0 ||
        descriptionValue.trim().length === 0 ||
        peopleCount < 1
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
})();
