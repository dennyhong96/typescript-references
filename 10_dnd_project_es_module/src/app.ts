import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

const projectInput = new ProjectInput();
console.log({ projectInput });

const activeProjectList = new ProjectList("active");
console.log({ activeProjectList });

const finishedProjectList = new ProjectList("finished");
console.log({ finishedProjectList });
