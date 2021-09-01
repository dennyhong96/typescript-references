(function () {
  enum ProjectStatus {
    ACTIVE,
    FINISHED,
  }

  // PROJECT TYPE
  class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public peopleCount: number,
      public status: ProjectStatus
    ) {}
  }

  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  // PROJECT STATE MANAGEMENT CLASS
  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (!this.instance) {
        this.instance = new this();
      }
      return this.instance;
    }

    addProject(title: string, description: string, peopleCount: number) {
      const newProject = new Project(
        "_" + Math.random().toString(36).substr(2, 9),
        title,
        description,
        peopleCount,
        ProjectStatus.ACTIVE
      );
      this.projects.push(newProject);
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  const projectState = ProjectState.getInstance();
  console.log({ projectState });

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

  // COMPONENT BASE CLASS
  // Mark as abstract class, can't be directly instantiated
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templdateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templdateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild! as U;
      if (newElementId) {
        this.element.id = newElementId;
      }

      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void;

    abstract renderContent(): void;
  }

  // PROJECT LIST CLASS
  class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.assignedProjects = [];

      // Call configure and renderContent in child class not super class
      // since they may need some logic to run beforehand
      this.configure();
      this.renderContent();
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      const listEl = this.element.querySelector("ul")!;
      listEl.id = listId;
      const title = this.element.querySelector("h2")!;
      title.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    configure() {
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((p) =>
          this.type === "active"
            ? p.status === ProjectStatus.ACTIVE
            : p.status === ProjectStatus.FINISHED
        );
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    private renderProjects() {
      const listEl = this.element.querySelector(
        `#${this.type}-projects-list`
      )! as HTMLUListElement;

      listEl.innerHTML = "";
      this.assignedProjects.forEach((project: Project) => {
        const listItem = document.createElement("li");
        listItem.textContent = project.title;
        listEl.appendChild(listItem);
      });
    }
  }

  // PROJECT INPUT CLASS
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  const projectInput = new ProjectInput();
  console.log({ projectInput });

  const activeProjectList = new ProjectList("active");
  console.log({ activeProjectList });

  const finishedProjectList = new ProjectList("finished");
  console.log({ finishedProjectList });
})();
