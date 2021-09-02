// PROJECT STATUS TYPE

namespace App {
  export enum ProjectStatus {
    ACTIVE,
    FINISHED,
  }

  // PROJECT TYPE
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public peopleCount: number,
      public status: ProjectStatus
    ) {}
  }
}
