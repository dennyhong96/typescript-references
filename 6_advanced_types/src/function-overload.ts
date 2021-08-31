(function () {
  type Combinable = string | number;

  // Function overloads can help us when typescript can't do a good job inferring the function return type
  // Or there are multiple call signitures that results in multiple return types
  function add(a: number, b: number): number;
  function add(a: string, b: string): string;
  function add(a: number, b: string): string;
  function add(a: string, b: number): string;
  function add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }

  const str = add("hi", ",there");
  console.log(str.split(","));
})();
