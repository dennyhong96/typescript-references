// namespace imports
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
  const projectInput = new ProjectInput();
  console.log({ projectInput });

  const activeProjectList = new ProjectList("active");
  console.log({ activeProjectList });

  const finishedProjectList = new ProjectList("finished");
  console.log({ finishedProjectList });
}
