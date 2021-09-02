// PROJECT STATE MANAGEMENT

// export what's needed outside this file
namespace App {
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  // PROJECT STATE MANAGEMENT CLASS
  export class ProjectState extends State<Project> {
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
      this.notifyListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((p) => p.id === projectId);
      if (!project || project.status === newStatus) return;
      project.status = newStatus;
      this.notifyListeners();
    }

    private notifyListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
  console.log({ projectState });
}
