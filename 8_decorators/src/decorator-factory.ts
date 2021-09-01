(function () {
  // Decorators factories are functions that return decorator functions
  function Logger(logString: string) {
    return function Logger(constructor: Function) {
      console.log(logString);
      console.log(constructor);
    };
  }

  // Similar to how angular works
  function WithTemplate(template: string, containerElementId: string) {
    return function <T extends { new (...args: any[]): { name: string } }>(
      originalConstructor: T
    ) {
      // Returns a new constructor function (class) to overwrite the original one
      // Can extends the original one
      return class extends originalConstructor {
        constructor(..._: any[]) {
          super();

          console.log("Renderring template...");
          const container = document.getElementById(containerElementId);

          if (container) {
            container.innerHTML = template;
            container.querySelector("h1")!.textContent += this.name;
          }
        }
      };
    };
  }

  // Using a decorator factory (invoke it)
  // Decorators functions run bottom up, bottom first
  // Decorator factories are invokes top down, top first
  @Logger("LOGGING PERSON")
  @WithTemplate(`<h1>Person name: </h1>`, "app")
  class Person {
    name = "Denny";

    constructor() {
      console.log("Creating person object...");
    }
  }

  const p = new Person();
  console.log({ p });
})();
