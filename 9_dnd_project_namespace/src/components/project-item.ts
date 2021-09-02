/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/dragAndDrop.ts" />

// PROJECT ITEM CLASS

namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    // Using a getter to transform data
    private get persons() {
      return this.project.peopleCount === 1
        ? `1 person`
        : `${this.project.peopleCount} persons`;
    }

    constructor(listElementId: string, project: Project) {
      super("single-project", listElementId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(evt: DragEvent) {
      evt.dataTransfer!.setData("text/plain", this.project.id);
      evt.dataTransfer!.effectAllowed = "move"; // set cursor
    }

    @Autobind
    dragEndHandler(_: DragEvent) {}

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector(
        "h3"
      )!.textContent = `${this.persons} assigned`;
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
