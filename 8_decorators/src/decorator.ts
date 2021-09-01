(function () {
  // Decorators are function applied to a class
  // Decorators ususally starts with uppercase
  function Logger(constructor: Function) {
    console.log("Logging...");
    console.log(constructor);
  }

  // Using a decorator
  // Decorators are invoked when class is defined, not instantiated
  @Logger
  class Person {
    name = "Denny";

    constructor() {
      console.log("Creating person object...");
    }
  }

  const p = new Person();
  console.log({ p });
})();
