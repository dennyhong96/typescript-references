(function () {
  // Use extends on generics for type constraints
  function merge<T extends object, U extends object>(obj1: T, obj2: U) {
    return { ...obj1, ...obj2 }; // TS infers merge returns the intersaction of T and U (T & U)
  }

  const merged = merge(
    { name: "Denny", hobbies: ["COD", "PUBG"] },
    { age: 24 }
  );

  // console.log(merged.age);
  console.log(merged.hobbies);
  console.log(merged.name);
  console.log(merged);

  // Only cares the generic has a length property
  interface Lengthy {
    length: number;
  }

  function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = "Got no value.";

    if (element.length === 1) {
      description = `Got 1 character.`;
    } else if (element.length) {
      description = `Got ${element.length} characters.`;
    }

    return [element, description];
  }

  console.log(countAndDescribe("Hi, there!"));
  console.log(countAndDescribe(["Denny", "Sharon"]));
})();
