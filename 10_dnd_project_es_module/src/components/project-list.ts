import { Component } from "./base-component.js";
import { Project, ProjectStatus } from "../models/project.js";
import { Autobind } from "../decorators/autobind.js";
import { DragTarget } from "../models/dragAndDrop.js";
import { projectState } from "../state/project.js";
import { ProjectItem } from "./project-item.js";

// PROJECT LIST CLASS

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    // Call configure and renderContent in child class not super class
    // since they may need some logic to run beforehand
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(evt: DragEvent) {
    if (evt.dataTransfer?.types[0] === "text/plain") {
      evt.preventDefault(); // prevent default in dragOverHandler to trigger drop event
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(evt: DragEvent) {
    const projectId = evt.dataTransfer?.getData("text/plain");
    if (!projectId) return;
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
    );
    this.removeDropBackground();
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    this.removeDropBackground();
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    const listEl = this.element.querySelector("ul")!;
    listEl.id = listId;
    const title = this.element.querySelector("h2")!;
    title.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
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

  private removeDropBackground() {
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.remove("droppable");
  }

  private renderProjects() {
    const listElementId = `${this.type}-projects-list`;
    const listEl = this.element.querySelector(
      `#${listElementId}`
    )! as HTMLUListElement;

    listEl.innerHTML = "";
    this.assignedProjects.forEach((project: Project) => {
      new ProjectItem(listElementId, project);
    });
  }
}
