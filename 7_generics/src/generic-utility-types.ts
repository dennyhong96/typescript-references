(function () {
  interface CourseGoal {
    title: string;
    description: string;
    completeUtil: Date;
  }

  // @ts-ignore
  function createCourseGoal(
    title: string,
    description: string,
    date: Date
  ): CourseGoal {
    let createdCourseGoal: Partial<CourseGoal> = {};
    createdCourseGoal.title = title;
    createdCourseGoal.description = description;
    createdCourseGoal.completeUtil = date;
    return createdCourseGoal as CourseGoal;
  }

  const names: Readonly<string[]> = ["Denny", "Sharon"];
  // names.push("Joseph");
  // names.pop()
  console.log([...names]);
})();
