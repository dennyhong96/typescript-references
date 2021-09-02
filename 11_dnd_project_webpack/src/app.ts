import "./app.css";

import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

const projectInput = new ProjectInput();
console.log({ projectInput });

const activeProjectList = new ProjectList("active");
console.log({ activeProjectList });

const finishedProjectList = new ProjectList("finished");
console.log({ finishedProjectList });

console.log("hello");
