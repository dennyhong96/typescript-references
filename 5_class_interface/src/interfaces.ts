(function () {
  // type AddFn = (a: number, b: number) => number;

  // Interfaces as function types
  interface AddFn {
    (a: number, b: number): number;
  }
  let add: AddFn;
  add = (a: number, b: number) => a + b;
  add(1, 1);

  interface Named {
    readonly name?: string;
    outputName?: string;
  }

  // Interfaces have no implementation details at all, abstract classes can have partial(some) implementation details
  interface Greetable extends Named {
    greet: (phrase: string) => void;
  }

  // a class can implement multiple interfaces with comma seperation
  class Person implements Greetable {
    constructor(public age: number, public name: string = "User") {}

    greet(phrase: string) {
      console.log(`${phrase}, ${this.name}`);
    }
  }

  const denny: Greetable = new Person(24, "Denny");
  denny.greet("Hello");
  denny.greet("Hi there");
  console.log({ denny });

  // denny.name = "nope";
})();
